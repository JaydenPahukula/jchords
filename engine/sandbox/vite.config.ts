import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  server: {
    fs: {
      // allow imports from one level up
      allow: ['..', '.'],
    },
  },
  resolve: {
    alias: {
      engine: path.resolve(__dirname, '../src'),
      src: path.resolve(__dirname, '../src'),
    },
  },
  optimizeDeps: {
    // ensure Vite pre-bundles your engine for faster HMR
    exclude: ['engine'],
  },
});
