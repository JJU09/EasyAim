import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  // Static export for GitHub Pages (all routes are static/SSG).
  output: "export",
  trailingSlash: true,
  // GitHub Pages can't run the Next image optimizer.
  images: { unoptimized: true },
};

const withMDX = createMDX();

export default withMDX(nextConfig);
