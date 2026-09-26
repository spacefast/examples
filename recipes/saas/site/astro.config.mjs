import { defineConfig } from 'astro/config';

// A static, single-page marketing site — no SSR, no adapters.
// Everything is rendered at `astro build` time into plain HTML/CSS.
export default defineConfig({
  site: 'https://tideline.spacefast.app',
  compressHTML: true,
});
