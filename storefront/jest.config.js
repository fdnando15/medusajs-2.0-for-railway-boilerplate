// Set required env vars for testing
process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY = "test-publishable-key"
process.env.NEXT_PUBLIC_BASE_URL = "http://localhost:8000"
process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL = "http://localhost:9000"

const nextJest = require("next/jest")

const createJestConfig = nextJest({
  dir: "./",
})

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^@lib/(.*)$": "<rootDir>/src/lib/$1",
    "^@modules/(.*)$": "<rootDir>/src/modules/$1",
  },
  collectCoverageFrom: [
    "src/lib/util/**/*.ts",
    "src/modules/**/components/**/*.tsx",
    "!src/**/*.d.ts",
    "!src/**/__tests__/**",
  ],
  testMatch: [
    "**/__tests__/**/*.test.ts",
    "**/__tests__/**/*.test.tsx",
  ],
  transform: {
    "^.+\\.(t|j)sx?$": [
      "@swc/jest",
      {
        jsc: {
          transform: {
            react: {
              runtime: "automatic",
            },
          },
        },
      },
    ],
  },
}

module.exports = createJestConfig(customJestConfig)
