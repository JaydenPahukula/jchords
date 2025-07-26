import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';

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
      src: '/src',
    },
  },
  envDir: resolve(__dirname, 'env'),
});
