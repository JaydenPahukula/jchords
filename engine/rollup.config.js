import typescript from '@rollup/plugin-typescript';
import { dts } from 'rollup-plugin-dts';

export default [
  {
    input: 'src/index.ts',
    output: {
      file: 'lib/jchords-engine.js',
    },
    plugins: [typescript()],
  },
  {
    input: 'lib/dts/index.d.ts',
    output: {
      file: 'lib/jchords-engine.d.ts',
    },
    plugins: [dts()],
  },
];
