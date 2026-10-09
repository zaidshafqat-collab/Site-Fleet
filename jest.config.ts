import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        tsconfig: {
          jsx: "react-jsx"
        }
      }
    ]
  },

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "^three/examples/jsm/(.*)$": "<rootDir>/__mocks__/three-example.ts"
  },

  testPathIgnorePatterns: ["/node_modules/", "/.next/"]
};

export default config;
