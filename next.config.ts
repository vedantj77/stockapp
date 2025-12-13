import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',  // ← CRITICAL for GitHub Pages
  images: {
    unoptimized: true,
  },
  trailingSlash: false,
  // Remove eslint and typescript configs or fix them:
}

export default nextConfig;