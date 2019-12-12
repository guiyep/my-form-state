import pkg from './package.json';
import { rollupBase } from './rollup.base';

const isProd = process.env.NODE_ENV === 'production';

export default {
  input: 'src/redux/index.js',
  output: [
    {
      file: pkg.redux,
      format: 'cjs',
      sourcemap: !isProd,
      compact: true,
      exports: 'named',
    },
  ],
  ...rollupBase,
};
