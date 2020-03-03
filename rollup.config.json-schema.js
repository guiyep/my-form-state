import cleaner from 'rollup-plugin-cleaner';
import { rollupBase } from './rollup.base';
import pkg from './package.json';

const isProd = process.env.NODE_ENV === 'production';

const coreConfig = {
  input: 'src/core/validators/json-schema/ajv/index.js',
  output: [
    {
      file: pkg['json-schema'],
      format: 'cjs',
      sourcemap: !isProd,
      compact: true,
      exports: 'named',
    },
  ],
  ...rollupBase,
};

// this is the first in run so, we need to clear the folder first
if (isProd) {
  coreConfig.plugins.push(
    cleaner({
      targets: ['./dist/', './build'],
    }),
  );
}

export default coreConfig;
