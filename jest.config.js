/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/coverage/',
    '/doc/',
    '/tools/',
    'src/index.ts',
  ],
  coverageReporters: ['lcov', 'text-summary', 'html'],
  reporters: [
    'default',
    [
      'jest-html-reporters',
      {
        publicPath: './doc/tests',
        filename: 'results.html',
        includeConsoleLog: false,
        darkTheme: true,
        openReport: false,
      },
    ],
  ],
};
