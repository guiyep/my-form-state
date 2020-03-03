import { rollupBase } from './rollup.base';
import pkg from './package.json';

const isProd = process.env.NODE_ENV === 'production';

const coreConfig = {
  input: 'src/core/validators/yup/index.js',
  output: [
    {
      file: pkg.yup,
      format: 'cjs',
      sourcemap: !isProd,
      compact: true,
      exports: 'named',
    },
  ],
  ...rollupBase,
};

export default coreConfig;
