import pkg from './package.json';
import { rollupBase } from './rollup.base';

export default {
  input: 'src/redux/index.js',
  output: [
    {
      file: pkg.redux,
      format: 'cjs',
      sourcemap: true,
      compact: true,
      exports: 'named',
    },
    {
      file: pkg['redux-module'],
      format: 'es',
      sourcemap: true,
      compact: true,
      exports: 'named',
    },
  ],
  ...rollupBase,
};
