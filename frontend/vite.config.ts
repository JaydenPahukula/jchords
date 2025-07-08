import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { Connect, defineConfig } from 'vite';

// url rewrites that mimic the firebase rewrites
const rewriteMiddleware: Connect.NextHandleFunction = (req, _res, next) => {
  if (req.url?.startsWith('/song/')) {
    req.url = '/song/index.html';
  } else if (req.url?.startsWith('/editor/') || req.url === '/editor') {
    req.url = '/editor/index.html';
  }
  next();
};

export default defineConfig({
  plugins: [
    react({ babel: { plugins: [['module:@preact/signals-react-transform']] } }),
    {
      name: 'rewrites',
      configureServer(serve) {
        serve.middlewares.use(rewriteMiddleware);
      },
      configurePreviewServer(serve) {
        serve.middlewares.use(rewriteMiddleware);
      },
    },
  ],
  server: {
    port: 5173,
  },
  build: {
    rollupOptions: {
      input: {
        home: resolve(__dirname, 'index.html'),
        song: resolve(__dirname, 'song/index.html'),
        editor: resolve(__dirname, 'editor/index.html'),
      },
    },
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
