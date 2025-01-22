import { type Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.tsx'],
  theme: {
    colors: {
      bg0: '#fbfbfb',
      bg1: '#eeeeee',
      bg2: '#e7e6e5',
      fg1: '#696866',
      fg0: '#000000',
      fgerror: '#ff0000',
    },
    fontFamily: {
      sans: ['Roboto', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [],
} satisfies Config;
