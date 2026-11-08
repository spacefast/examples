import preact from "@astrojs/preact";
import spacefast from "@spacefast/astro";
import { defineConfig } from "astro/config";

// Marginalia is a fully static Astro build that happens to sit in front of a
// Spacefast Zero capsule. Nothing renders at request time: `astro build` writes
// flat HTML into dist/, `scripts/stage-capsule.mjs` drops the capsule sources in
// beside it, and `sf build dist` compiles the server half into the version.
export default defineConfig({
  site: "https://astro-zero.view.fast",
  outDir: "./dist",
  compressHTML: true,
  integrations: [
    preact(),
    spacefast({
      mode: "static",
      // Inline rules merge ahead of the `_headers` file in this directory; the
      // integration compiles both, fails the build on a bad rule, mirrors them
      // in `astro dev`, and writes the merged files into dist/.
      redirects: [
        "/latest  /posts/static-isnt-the-opposite-of-alive  302",
        "/comments  /posts/your-comment-section-is-a-database  301",
      ],
    }),
  ],
});
