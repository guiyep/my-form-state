import { rollupBase } from './rollup.base';
import pkg from './package.json';

const isProd = process.env.NODE_ENV === 'production';

const coreConfig = {
  input: 'src/index.js',
  output: [
    {
      file: pkg.core,
      format: 'cjs',
      sourcemap: !isProd,
      compact: true,
      exports: 'named',
    },
  ],
  ...rollupBase,
};

export default coreConfig;
