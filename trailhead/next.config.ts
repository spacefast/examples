import type { NextConfig } from "next";
import { spacefastNextImageConfig } from "@spacefast/image/next";

const nextConfig: NextConfig = {
  // Flat HTML in `out/`. No server, no Node.js runtime, nothing to keep warm.
  output: "export",
  // `/trails/angels-landing/index.html` instead of `/trails/angels-landing.html`,
  // so every route is a directory and links work with or without the slash.
  trailingSlash: true,
  images: {
    ...spacefastNextImageConfig,
    // Next resolves `loaderFile` against the project root and bundles it with
    // the client; the file is a one-line re-export of the package's loader.
    loaderFile: "./lib/spacefast-image-loader.ts",
  },
};

export default nextConfig;
