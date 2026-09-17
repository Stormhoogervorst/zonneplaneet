import type { NextConfig } from "next";

const APEX = "https://zonneplaneetactie.nl";

const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.zonneplaneetactie.nl" }],
        destination: `${APEX}/:path*`,
        permanent: true,
      },
      {
        source: "/:path*",
        has: [
          { type: "host", value: "zonneplaneetactie.nl" },
          { type: "header", key: "x-forwarded-proto", value: "http" },
        ],
        destination: `${APEX}/:path*`,
        permanent: true,
      },
      {
        source: "/clubs",
        destination: "/leden",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
