import { defineConfig } from "vite";
import deno from "@deno/vite-plugin";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [deno(), react()],
  resolve: {
    alias: {
      shared: "../shared",
    },
  },
});
