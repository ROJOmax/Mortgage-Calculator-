import { defineConfig } from "vite";

export default defineConfig({
  // Your configuration options here
  server: {
    port: 3000, // Customize the dev server port
  },
  build: {
    outDir: "dist", // Customize the build output directory
  },
  css: {
    modules: true, // Enable CSS modules if needed
  },
});
