/* eslint-disable no-underscore-dangle */
// import execa from 'execa';
import minimist from 'minimist';
import path from 'path';
import { existsSync } from 'fs';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { throwError } from './utils.mjs';

try {
  const _dirname = path.dirname(fileURLToPath(import.meta.url));

  const args = minimist(process.argv.slice(2));

  const newPackageName = args._[0];

  if (newPackageName === undefined) {
    throwError('No name given for package. \nPlease provide a unique name for your package \n\n "yarn new [nameOfPackage]"\n\n');
  }

  const packagesDirPath = path.resolve(_dirname, '..', 'packages');

  if (existsSync(path.resolve(packagesDirPath, newPackageName))) {
    throwError(`Package with name "${newPackageName}" already exists at:\n\n${path.resolve(packagesDirPath, newPackageName)}\n\n`);
  }

  const PACKAGE_JSON = JSON.stringify({
    name: newPackageName,
    version: '0.0.0',
    description: '',
    author: '',
    homepage: '',
    license: 'MIT',
    main: `dist/index.${newPackageName}.js`,
    types: `dist/index.${newPackageName}.d.ts`,
    directories: {
      dist: 'dist',
      test: '__tests__',
    },
    files: [
      'dist',
    ],
    scripts: {
      test: 'echo "Error: run tests from root" && exit 1',
    },
  }, null, 2);

  const TEMPLATE_INDEX_TS = `export { add } from './placeholder';
`;
  const TEMPLATE_PLACEHOLDER_TS = `export function add(value1: number, value2: number): number {
    return value1 + value2;
  }
`;
  const TEMPLATE_PLACEHOLDER_TEST_TS = `import { add } from 'core/placeholder';

describe('core', () => {
  it('needs tests', () => {
    const res = add(2, 2);

    expect(res).toBe(4);
  });
});
`;

  await fs.mkdir(path.resolve(packagesDirPath, newPackageName, 'src'), { recursive: true });
  await fs.mkdir(path.resolve(packagesDirPath, newPackageName, '__tests__'), { recursive: true });
  await fs.writeFile(path.resolve(packagesDirPath, newPackageName, 'src', 'index.ts'), TEMPLATE_INDEX_TS, 'utf8');
  await fs.writeFile(path.resolve(packagesDirPath, newPackageName, 'src', 'placeholder.ts'), TEMPLATE_PLACEHOLDER_TS, 'utf8');
  await fs.writeFile(path.resolve(packagesDirPath, newPackageName, '__tests__', 'placeholder.test.ts'), TEMPLATE_PLACEHOLDER_TEST_TS, 'utf8');
  await fs.writeFile(path.resolve(packagesDirPath, newPackageName, 'package.json'), PACKAGE_JSON, 'utf8');
} catch (err) {
  console.log('');
  console.error(err);
  console.log('');
  console.log('');
  process.exit(1);
}
