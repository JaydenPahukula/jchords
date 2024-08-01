import react from '@vitejs/plugin-react';

export default {
  base: './',
  plugins: [react()],
  publicDir: '/dist',
  resolve: {
    alias: {
      src: '/src',
    },
  },
};
