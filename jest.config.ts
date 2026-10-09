import type { Config } from "jest";
const config: Config = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "^three/examples/jsm/(.*)$": "<rootDir>/__mocks__/three-example.ts"
  },
  testPathIgnorePatterns: ["/node_modules/", "/.next/"]
};
export default config;
