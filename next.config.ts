import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: false,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Remove eslint config entirely
  // Vercel will handle ESLint warnings separately
};

export default nextConfig;