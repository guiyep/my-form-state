import pkg from './package.json';
import { rollupBase } from './rollup.base';
import cleaner from 'rollup-plugin-cleaner';

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
    }
  ],
  ...rollupBase,
};

// this is the first in run so, we need to clear the folder first
if (isProd) {
  coreConfig.plugins.push(
    cleaner({
      targets: ['./dist/'],
    }),
  );
}

export default coreConfig;
