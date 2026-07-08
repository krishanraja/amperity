import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Every image on the site is a brand SVG or a small pre-sized PNG;
  // the optimizer would only refuse the SVGs (400) and recompress
  // already-tiny assets.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
