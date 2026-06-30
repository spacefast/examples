import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Single-page app. The build emits a static bundle to dist/; the SPA fallback
// (public/_redirects → "/* /index.html 200") makes deep links like
// /post/123 resolve to index.html when hosted on Spacefast.
export default defineConfig({
  plugins: [react()],
  build: {
    target: "es2020",
    outDir: "dist",
  },
});
