import config from "../../jest.config";

export default {
  ...config,
  collectCoverageFrom: ["./src/**/*.{ts,vue}"],
  snapshotSerializers: ["jest-serializer-vue"],
  testEnvironment: "jsdom",
  transform: {
    ...config.transform,
    "^.+\\.vue$": "@vue/vue3-jest",
  }
};
