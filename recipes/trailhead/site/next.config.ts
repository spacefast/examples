import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Flat HTML in `out/`. No server, no Node.js runtime, nothing to keep warm.
  output: "export",
  // `/trails/angels-landing/index.html` instead of `/trails/angels-landing.html`,
  // so every route is a directory and links work with or without the slash.
  trailingSlash: true,
  images: {
    // This is `spacefastNextImageConfig` from `@spacefast/image/next`, inlined.
    //
    // The published guide spreads that export here and resolves the loader with
    // `require.resolve("@spacefast/image/next-loader")`. Neither line works with
    // @spacefast/image@0.2.2: Next compiles `next.config.ts` to CommonJS, and the
    // package's `exports` map only declares an `import` condition, so any
    // reference from the config throws ERR_PACKAGE_PATH_NOT_EXPORTED (Next 15 and
    // 16 alike). See this example's README.
    loader: "custom",
    qualities: [50, 60, 75, 85, 100],
    // Relative to the project root — Next joins this onto the root directory, so
    // an absolute path from `require.resolve` would break too. The file is a
    // one-line re-export, which leaves the bare specifier for the bundler to
    // resolve and keeps pnpm / Yarn PnP / hoisted workspaces working.
    loaderFile: "./lib/spacefast-image-loader.ts",
  },
};

export default nextConfig;
