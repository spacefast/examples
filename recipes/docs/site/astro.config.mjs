import { defineConfig } from 'astro/config';

// A fully static, multi-page documentation site. Code blocks are
// syntax-highlighted at build time with Shiki — nothing runs at request
// time beyond `astro build`.
export default defineConfig({
  site: 'https://ledger-docs.spacefast.app',
  compressHTML: true,
  markdown: {
    shikiConfig: { theme: 'github-dark-default' },
  },
});
