module.exports = {
  "stories": [
    "../../../apps/**/stories.ts",
    "../docs/*.stories.mdx"
  ],
  "addons": [
    "@storybook/addon-essentials"
  ],
  "framework": "@storybook/vue3",
  "core": {
    "builder": "@storybook/builder-webpack5"
  }
};
