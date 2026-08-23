import { defineConfig } from 'astro/config';
import remarkWikilinks from './src/lib/remark-wikilinks.mjs';

// Glasshouse — a static digital garden.
//
// Notes live as Markdown files in src/content/notes. They link to one another
// with [[wiki-style]] brackets; a small remark plugin (src/lib/remark-wikilinks)
// rewrites those into real <a> links at build time, and src/lib/garden.ts walks
// every note to compute the reverse — the backlinks panel — and the link graph.
// Everything renders to flat HTML in dist/. No server, no database at runtime.
export default defineConfig({
  site: 'https://glasshouse.spacefast.app',
  compressHTML: true,
  markdown: {
    remarkPlugins: [remarkWikilinks],
  },
});
