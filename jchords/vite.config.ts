import preact from '@preact/preset-vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [preact(), tailwindcss()],
  resolve: {
    preserveSymlinks: true,
    alias: {
      src: '/src',
    },
  },
});
