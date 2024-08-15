import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: './dist-editor',
    rollupOptions: {
      input: {
        editor: fileURLToPath(new URL('./index-editor.html', import.meta.url)),
      },
      output: {
        name: 'editor',
        dir: './dist-editor',
      },
    },
  },
  resolve: {
    alias: {
      src: '/src',
    },
  },
  server: {
    open: '/index-editor.html',
  },
});
