import { defineConfig } from 'astro/config';

// A static, single-page open-source tool landing page — no SSR, no adapters.
// Code samples are syntax-highlighted at build time with Astro's Shiki; the
// only thing that runs in the browser is the copy-to-clipboard button.
export default defineConfig({
  site: 'https://drift-cli.spacefast.app',
  compressHTML: true,
});
