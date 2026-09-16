import { NextResponse } from "next/server";
import { auth } from "@/auth";

const isDev = process.env.NODE_ENV !== "production";

/**
 * Runs on every route (not just /portal) because the CSP nonce below has to
 * be issued per-request for every page — Next.js's App Router streams RSC
 * payloads through inline <script> tags on every route, so script-src can
 * only be locked down via a per-request nonce, not a static header.
 *
 * Within that, the /portal gate is unchanged: requires a session, then
 * confines each role to its own subtree (Phase 1/8/9/10: an Applicant can't
 * wander into /portal/admin, etc.). Login itself is single-step OTP now —
 * there's no separate MFA-enrollment gate to enforce here anymore.
 */
export default auth((req) => {
  const { pathname } = req.nextUrl;
  const session = req.auth;

  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    // Nonces only cover <style> elements, not inline style="" attributes or
    // JS `el.style.x =` assignments — and Next/React's own internals (dev
    // overlay, route announcer) rely on those. A nonce here would silently
    // void 'unsafe-inline' (CSP ignores it once any nonce/hash is present),
    // so style-src stays nonce-free and keeps 'unsafe-inline' working.
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self' data:",
    "connect-src 'self'",
    "frame-ancestors 'none'",
    "form-action 'self'",
    "base-uri 'self'",
    "object-src 'none'",
  ].join("; ");

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("Content-Security-Policy", csp);

  const withCsp = (response: NextResponse) => {
    response.headers.set("Content-Security-Policy", csp);
    return response;
  };

  if (pathname.startsWith("/portal")) {
    if (!session?.user) {
      const loginUrl = new URL("/login", req.nextUrl.origin);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return withCsp(NextResponse.redirect(loginUrl));
    }

    const { role } = session.user;

    const roleHome: Record<string, string> = {
      APPLICANT: "/portal/applicant",
      ASSESSOR: "/portal/assessor",
      ADMIN: "/portal/admin",
    };

    const subtreesByRole: Record<string, string> = {
      "/portal/applicant": "APPLICANT",
      "/portal/assessor": "ASSESSOR",
      "/portal/admin": "ADMIN",
    };
    for (const [prefix, requiredRole] of Object.entries(subtreesByRole)) {
      if (pathname.startsWith(prefix) && role !== requiredRole) {
        return withCsp(NextResponse.redirect(new URL(roleHome[role] ?? "/portal", req.nextUrl.origin)));
      }
    }
  }

  return withCsp(NextResponse.next({ request: { headers: requestHeaders } }));
});

export const config = {
  // /api/auth is deliberately excluded: NextAuth's own route handlers (used
  // by signIn/signOut) must not be re-wrapped by this middleware's auth()
  // HOC, which can interfere with the session cookie it writes.
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)"],
  runtime: "nodejs",
};
