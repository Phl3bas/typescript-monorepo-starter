/*
Run Rollup in watch mode for development.
To specific the package to watch, simply pass its name and the desired build
formats to watch (defaults to "global"):
```
# name supports fuzzy match. will watch all packages with name containing "dom"
nr dev dom
# specify the format to output
nr dev core --formats cjs
# Can also drop all __DEV__ blocks with:
__DEV__=false nr dev
```
*/

import execa from 'execa';
import minimist from 'minimist';
import { fuzzyMatchTarget } from './utils.mjs';

const args = minimist(process.argv.slice(2));

const target = args._.length ? fuzzyMatchTarget(args._)[0] : 'core';
const formats = args.formats || args.f;
const sourceMap = args.sourcemap || args.s;
const commit = execa.sync('git', ['rev-parse', 'HEAD']).stdout.slice(0, 7);

execa(
  'rollup',
  [
    '-c',
    '--environment',
    [
      `COMMIT:${commit}`,
      `TARGET:${target}`,
      `FORMATS:${formats || 'global'}`,
      sourceMap ? 'SOURCE_MAP:true' : '',
    ]
      .filter(Boolean)
      .join(','),
  ],
  {
    stdio: 'inherit',
  },
);
