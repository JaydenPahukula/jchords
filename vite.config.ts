import react from '@vitejs/plugin-react';

export default {
  base: './',
  plugins: [react()],
  resolve: {
    alias: {
      src: '/src',
    },
  },
};
