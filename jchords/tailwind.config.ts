import { type Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.tsx'],
  theme: {
    colors: {
      bg0: '#fbfbfb',
      bg1: '#eeeeee',
      bg2: '#e7e6e5',
      bg3: '#d2d1d1',
      bg9: '#2e2e2e',
      fg0: '#000000',
      fg1: '#696866',
      fg9: '#eeeeee',
      fgerror: '#ff0000',
      fgdisabled: '#878786',
    },
    extend: {},
  },
  plugins: [],
} satisfies Config;
