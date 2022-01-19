/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-syntax */
/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */

import fs from 'fs';

import { readFile } from 'fs/promises';
import chalk from 'chalk';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export async function getPackageJSON(url) {
  return JSON.parse(await readFile(url));
}

export const targets = (fs.readdirSync('packages').filter(async (f) => {
  if (!fs.statSync(`packages/${f}`).isDirectory()) {
    return false;
  }

  const url = resolve(__dirname, '../packages', f, 'package.json');

  const pkg = getPackageJSON(url);

  if (pkg.private && !pkg.buildOptions) {
    return false;
  }
  return true;
}));

export const fuzzyMatchTarget = (partialTargets, includeAllMatching) => {
  const matched = [];
  partialTargets.forEach((partialTarget) => {
    for (const target of targets) {
      if (target.match(partialTarget)) {
        matched.push(target);
        if (!includeAllMatching) {
          break;
        }
      }
    }
  });
  if (matched.length) {
    return matched;
  }
  console.log();
  console.error(
    `  ${chalk.bgRed.white(' ERROR ')} ${chalk.red(
      `Target ${chalk.underline(partialTargets)} not found!`,
    )}`,
  );
  console.log();

  return process.exit(1);
};

export function throwError(msg, clear = true) {
  if (clear) {
    console.clear();
  }
  console.error('Project Script Error');
  console.error('--------------------');

  throw Error(msg);
}
