import pkg from './package.json';
import { rollupBase } from './rollup.base';

export default {
  input: 'src/react/index.js',
  output: [
    {
      file: pkg.react,
      format: 'cjs',
      sourcemap: true,
      compact: true,
      exports: 'named',
    },
    {
      file: pkg['react-module'],
      format: 'es',
      sourcemap: true,
      compact: true,
      exports: 'named',
    },
  ],
  ...rollupBase,
};
