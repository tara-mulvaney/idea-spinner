module.exports = {
  stories: [
    "../stories/*.stories.@(ts|mdx)"
  ],
  addons: [
    "@storybook/addon-essentials",
    "storybook-addon-pseudo-states"
  ],
  framework: "@storybook/vue3",
  core: {
    "builder": "@storybook/builder-webpack5"
  }
};
