import type { NextConfig } from "next";

/**
 * Content-Security-Policy is set per-request in middleware.ts instead of
 * here: Next.js's App Router streams RSC payloads through inline <script>
 * tags on every route, so script-src can only be locked down with a nonce
 * issued fresh per request, not a static header.
 */
const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
