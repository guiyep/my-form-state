import pkg from './package.json';
import { rollupBase } from './rollup.base';

export default {
  input: 'src/react-redux/index.js',
  output: [
    {
      file: pkg['react-redux'],
      format: 'cjs',
      sourcemap: true,
      compact: true,
      exports: 'named',
    },
    {
      file: pkg['react-redux-module'],
      format: 'es',
      sourcemap: true,
      compact: true,
      exports: 'named',
    },
  ],
  ...rollupBase,
};
