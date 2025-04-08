import preact from '@preact/preset-vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [preact(), tailwindcss()],
  server: {
    port: 5174,
  },
  resolve: {
    alias: {
      src: '/src',
    },
  },
  envDir: '../',
});
