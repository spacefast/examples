import { defineConfig } from 'astro/config';

// A single-page party invite — fully static, no SSR, no adapters.
export default defineConfig({
  site: 'https://mias-30th.spacefast.app',
  compressHTML: true,
});
