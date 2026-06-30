import { defineConfig } from 'astro/config';

// A static wedding site — no SSR, no adapters, no build step beyond `astro build`.
export default defineConfig({
  site: 'https://maya-and-daniel.spacefast.app',
  compressHTML: true,
});
