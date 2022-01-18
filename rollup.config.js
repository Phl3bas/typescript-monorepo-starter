/* eslint-disable import/no-dynamic-require */
import path from 'path';
import ts from 'rollup-plugin-ts';

import json from '@rollup/plugin-json';

if (!process.env.TARGET) {
  throw new Error('TARGET package must be specified via --environment flag.');
}

// const masterVersion = require('./package.json').version;

const packagesDir = path.resolve(__dirname, 'packages');
const packageDir = path.resolve(packagesDir, process.env.TARGET);
const resolve = (p) => path.resolve(packageDir, p);
const pkg = require(resolve('package.json'));
const packageOptions = pkg.buildOptions || {};
const name = packageOptions.filename || path.basename(packageDir);

export default {
  input: resolve('src/index.ts'),
  output: {
    file: resolve(`dist/${name}.esm-browser.js`),
    format: 'es',

  },
  plugins: [json({
    namedExports: false,
  }), ts({
    transpiler: 'typescript',

    tsconfig: (resolvedConfig) => ({
      ...resolvedConfig,
      sourceMap: process.env.sourceMap,
      declaration: true,
      declarationMap: false,
    }),

  })],
};
