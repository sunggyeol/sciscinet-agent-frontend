import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['vega', 'vega-lite', 'vega-embed', 'react-vega'],
};

export default nextConfig;
