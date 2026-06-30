import { defineConfig } from 'astro/config';

// A static, single-page conference site — no SSR, no adapters,
// nothing to run at request time beyond `astro build`.
export default defineConfig({
  site: 'https://devhorizon-2026.spacefast.app',
  compressHTML: true,
});
