import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Static-friendly build: relative asset paths so the bundle works from any
// subpath once published to Spacefast.
export default defineConfig({
  base: "./",
  plugins: [react()],
});
