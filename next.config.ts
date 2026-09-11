import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  // An absolute prefix keeps Vinext's artifact layout rooted at _next/static.
  assetPrefix: (process.env.PAGES_BASE_URL || '').replace(/\/$/, ''),
};

export default nextConfig;
