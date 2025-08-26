import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';

const src = resolve(__dirname, 'src');

export default defineConfig({
  plugins: [
    react({ babel: { plugins: [['module:@preact/signals-react-transform']] } }),
    tailwindcss(),
  ],
  server: {
    port: 5173,
  },
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      src: src,
      '@theme': src + '/style/theme.css', // for css files
    },
  },
  envDir: resolve(__dirname, 'env'),
});
