# idea-spinner

[![Maintainability](https://api.codeclimate.com/v1/badges/9bc0a87e673be83e89fa/maintainability)](https://codeclimate.com/github/daniellacosse/idea-spinner/maintainability)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

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

## tour (wip)

- monorepo using yarn 3 and typescript
  - apps are platform-specific services
  - packages are resuable javascript modules (they shouldn't contain any platform-specific APIs)
- web app using vue 3
- trunk development
- valid scripts are all in root package.json
  - to run a script on a specific package, `yarn workspace <package name> <script name>` e.g. `yarn workspace @idea-spinner/storybook build`

## setting up VSCode (wip)
yarn 3 makes it a bit funky in places so we opted to not support vscode directly (for now)

1. Install recommended plugins. (Why?)
2. Create your `.vscode/settings.json`:

```
{
  "typescript.tsdk": ".yarn/sdks/typescript/lib"
}
```

> 💡 Whenever you have funny issues, confirm that TS in the bottom-bar is set to our SDK. You can click on it to change.
