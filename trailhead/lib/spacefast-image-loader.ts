// Next resolves `images.loaderFile` relative to the project root and bundles it
// with the client. Re-exporting the package's loader from a local file keeps the
// bare specifier for the bundler to resolve, so pnpm / Yarn PnP / hoisted
// workspaces all work without a path lookup in next.config.ts.
export { default } from "@spacefast/image/next-loader";
