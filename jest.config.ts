export default {
  collectCoverage: true,
  coverageDirectory: "<rootDir>/coverage",
  coverageThreshold: {
    global: {
      branches: 87.5
    }
  },
  transform: {
    "^.+\\.ts$": "ts-jest"
  }
};
