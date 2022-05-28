import config from "../../jest.config";

export default {
  ...config,
  snapshotSerializers: ["jest-serializer-vue"],
  testEnvironment: "jsdom",
  transform: {
    ...config.transform,
    "^.+\\.vue$": "@vue/vue3-jest",
  }
};
