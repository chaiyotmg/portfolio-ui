import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'objectstorage.ap-singapore-1.oraclecloud.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
