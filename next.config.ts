import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/clubs",
        destination: "/leden",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
