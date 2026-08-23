import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Relative base so the built site works from any path on Spacefast.
export default defineConfig({
  base: "./",
  plugins: [react()],
});
