import typescript from '@rollup/plugin-typescript';
import { dts } from 'rollup-plugin-dts';

export default [
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/jchords-engine.js',
    },
    plugins: [typescript()],
  },
  {
    input: 'dist/dts/index.d.ts',
    output: {
      file: 'dist/jchords-engine.d.ts',
    },
    plugins: [dts()],
  },
];
