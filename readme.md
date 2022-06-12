# idea spinner 🎰

[![Maintainability](https://api.codeclimate.com/v1/badges/9bc0a87e673be83e89fa/maintainability)](https://codeclimate.com/github/daniellacosse/idea-spinner/maintainability)
[![codecov](https://codecov.io/gh/daniellacosse/idea-spinner/branch/main/graph/badge.svg?token=ZVNL2L4LPB)](https://codecov.io/gh/daniellacosse/idea-spinner)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

The Idea Spinner is an application design to help you quickly generate prompts for any defined creative activity or endeavor.

*Currently it's set to only demo board game prompts - feel free to fork and modify the [demo.json](./apps/web/src/demo.json).*

## quick start

```sh
# download the workspace
git clone https://github.com/daniellacosse/idea-spinner.git
cd idea-spinner

# link dependencies
yarn

# start the dev server
yarn watch
```

## high-level tour

### devtools

Idea Spinner is a [yarn workspace](https://yarnpkg.com/features/workspaces/#gatsby-focus-wrapper) that is set up to developed directly off main. [Vercel](https://vercel.com/) runs the linter and test suite before deploying to production. If you'd like to contribute, you're welcome to reach out to any of our contributors to set up a pair-programming session.

Documentation is generated by [typedoc](https://typedoc.org) on commit and loaded into the storybook (which should open when you run `yarn watch`). [ESLint](https://www.npmjs.com/package/eslint-plugin-jsdoc) ensures a minimum amount of documentation coverage is written during development.

You can find a list of all the defined `yarn` scripts you can run [here](https://github.com/daniellacosse/idea-spinner/blob/main/package.json#L40).

### folder structure

The source code is organized into two top level directories:
- `/apps` are platform-specific services, meant to be deployed for direct use by an end-user
- `/packages` are resuable javascript modules that should avoid any platform-specific APIs

Generally you should use folders to co-locate and nest dependencies. For example:

```js
/packages
  /spinner
    /Spinner
      index.ts // business logic and module definition
      test.ts // unit tests
      /ShuffleQueue // submodule Spinner depends on
```

## setting up VSCode
Given the nascency of the vue3 and yarn3 ecosystems, many of our preferred VSCode extensions haven't settled yet. We won't be supporting VSCode directly until this happens. For now:

1. Install the recommended plugins by clicking on the `Extensions` icon, typing `@recommended`, and then clicking the `Install` button on those that are still available.
2. Create your `.vscode/settings.json`:

```
{
  "typescript.tsdk": ".yarn/sdks/typescript/lib"
}
```
3. Confirm that TS in the bottom-bar is set to our SDK. You can click on it to change.
  