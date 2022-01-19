# Typescript Monorepo Starter

This repo is a template for a typescript monorepo project.

techstack used

* typescript
* jest/ts-jest
* lerna
* eslint
* rollup
* commitlint
* husky
* commitizen
* yarn

## install

```bash 
    npx degit git:Phl3bas/typescript-monorepo-starter
```

## scripts

```bash

    yarn dev # start dev server - yarn dev core (run dev server for package 'core')
    yarn build # run build - yarn build core (build core pacakge) [flags: --f/--formats, --s/--sourceMap]
    yarn new # creates a new boilerplate package in packages folder
    yarn test # run unit tests
    yarn test:coverage # run unit tests in coverage mode

    # untils, mainly used by husky
    yarn lerna 
    yarn prepare
    yarn lint-staged
    yarn commitlint
    yarn setup
    yarn bootstrap

```

```bash
    # build
    yarn build core # build core packages
    yarn build core,api # build core and api packages
    yarn build core --formats es # build core package to esm format
    yarn build core --sourceMap # build core package with sourcemaps

```

