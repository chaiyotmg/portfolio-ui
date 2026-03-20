import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'objectstorage.ap-singapore-1.oraclecloud.com',
      },
    ],
  },
};

export default nextConfig;
