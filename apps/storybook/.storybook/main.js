module.exports = {
  stories: [
    "../stories/*.stories.@(ts|mdx)"
  ],
  addons: [
    "@storybook/addon-essentials"
  ],
  framework: "@storybook/vue3",
  core: {
    "builder": "@storybook/builder-webpack5"
  }
};
