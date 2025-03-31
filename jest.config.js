module.exports = {
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
    globalSetup: 'jest-preset-angular/global-setup',
    testMatch: ["**/*.spec.ts"],
    transform: {
      "^.+\\.(ts|mjs|js|html)$": "jest-preset-angular",
    },
    transformIgnorePatterns: ["node_modules/(?!.*\\.mjs$|jest-preset-angular|@angular)"],
    moduleNameMapper: {
      "\\.(css|scss|sass|less)$": "identity-obj-proxy",
      "^@app/(.*)$": "<rootDir>/src/app/$1",
      "^(.*)\\.html$": "<rootDir>/src/__mocks__/htmlMock.js"
    },
    moduleFileExtensions: ['ts', 'js', 'html', 'json'],
    collectCoverage: true,
    collectCoverageFrom: ["src/app/**/*.ts", "!src/main.ts"],
    coverageDirectory: 'coverage',
    coverageReporters: ['html', 'lcov', 'text-summary'],
    coveragePathIgnorePatterns: [
      "src/app/app.module.ts",
      "src/app/app-routing.module.ts"
    ],
    testEnvironment: "jsdom",
    testEnvironmentOptions: {
      resources: "usable"
    },
  };
  