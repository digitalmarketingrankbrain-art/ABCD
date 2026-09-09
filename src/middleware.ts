import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { mfaRequiredForRole } from "@/lib/auth/store";

/**
 * Gates everything under /portal: requires a session, then confines each
 * role to its own subtree (Phase 1/8/9/10: an Applicant can't wander into
 * /portal/admin, etc.), then forces Admin/Assessor sessions without MFA
 * enrolled to /portal/mfa-setup before anything else — Phase 1's "MFA
 * required, not just available, for Admin and Assessor" is enforced here,
 * not just described in a policy page.
 */
export default auth((req) => {
  const { pathname } = req.nextUrl;
  const session = req.auth;

  if (!session?.user) {
    const loginUrl = new URL("/login", req.nextUrl.origin);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const { role, mfaEnabled } = session.user;

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
      return NextResponse.redirect(new URL(roleHome[role] ?? "/portal", req.nextUrl.origin));
    }
  }

  if (mfaRequiredForRole(role) && !mfaEnabled && pathname !== "/portal/mfa-setup") {
    return NextResponse.redirect(new URL("/portal/mfa-setup", req.nextUrl.origin));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/portal", "/portal/:path*"],
  runtime: "nodejs",
};
