import config from "../../jest.config";

export default {
  ...config,
  collectCoverageFrom: ["./src/**/*.{ts,vue}"],
  snapshotSerializers: ["jest-serializer-vue"],
  testEnvironment: "jsdom",
  testEnvironmentOptions: {
    customExportConditions: ["node", "node-addons"],
  },
  transform: {
    ...config.transform,
    "^.+\\.vue$": "@vue/vue3-jest",
  },
};
