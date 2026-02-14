import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ['10.3.40.224'],
  reactCompiler: true,
  output: 'standalone',
};

export default nextConfig;
