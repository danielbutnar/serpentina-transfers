import type { NextConfig } from "next";

// Static export for GitHub Pages. The Pages workflow sets PAGES_BASE_PATH=/serpentina-transfers
// (a project page lives under /<repo>/); locally the site runs at the root.
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  poweredByHeader: false,
  // A static export has no image server; the few screenshots are already sized and compressed.
  images: { unoptimized: true },
  experimental: {
    // The root layout lives under app/[lang], so unmatched URLs need app/global-not-found.tsx.
    globalNotFound: true,
  },
};

export default nextConfig;
