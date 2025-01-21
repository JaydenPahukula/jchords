import { type Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.tsx'],
  theme: {
    colors: {
      bg0: '#fbfbfb',
      bg1: '#ededed',
      bg2: '#dadada',
      fg1: '#606060',
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
