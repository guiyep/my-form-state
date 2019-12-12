import pkg from './package.json';
import { rollupBase } from './rollup.base';

const isProd = process.env.NODE_ENV === 'production';

export default {
  input: 'src/react/index.js',
  output: [
    {
      file: pkg.react,
      format: 'cjs',
      sourcemap: !isProd,
      compact: true,
      exports: 'named',
    }
  ],
  ...rollupBase,
};
