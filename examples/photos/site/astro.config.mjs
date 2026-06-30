import { defineConfig } from 'astro/config';

// An image-first photography portfolio — fully static, no SSR or adapters.
// `astro build` emits a plain dist/ you can publish anywhere.
export default defineConfig({
  site: 'https://eliot-vance-photography.spacefast.app',
  compressHTML: true,
});
