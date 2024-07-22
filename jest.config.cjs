/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest/presets/default-esm',
  resolver: 'ts-jest-resolver',
  verbose: false,
  silent: true,
  detectOpenHandles: true,
  runInBand: true,
  forceExit: true,
  testTimeout: 40000,
  testEnvironment: 'node',
  collectCoverage: true,
  coverageReporters: ["json", "text", "lcov"],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  extensionsToTreatAsEsm: ['.ts'],
  transform: {
    '^.+\\.[tj]sx?$': [
      'ts-jest',
      {
        useESM: true,
        tsconfig: './tsconfig.test.json',
        isolatedModules: true
      },
    ],
  },
};
  