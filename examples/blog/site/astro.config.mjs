import { defineConfig } from 'astro/config';

// Margins — a static writing/dev blog. Markdown content collections, Shiki
// code highlighting, an RSS feed. Nothing runs at request time beyond
// `astro build`; the output in dist/ is plain HTML, CSS, and a sprinkle of JS.
export default defineConfig({
  site: 'https://margins.spacefast.app',
  compressHTML: true,
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: false,
    },
  },
});
