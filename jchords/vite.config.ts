import { defineConfig } from "vite";
import preact from "@preact/preset-vite";

export default defineConfig({
  plugins: [preact()],
  resolve: {
    preserveSymlinks: true,
    alias: {
      src: "/src",
    },
  },
});
