import { defineConfig } from 'astro/config';

// A long-form, chart-heavy annual survey report — fully static, no SSR or adapters.
// Every chart is server-rendered inline SVG, so `astro build` emits a plain dist/
// you can publish anywhere with no client-side charting library to download.
export default defineConfig({
  site: 'https://state-of-indie-web-2025.spacefast.app',
  compressHTML: true,
});
