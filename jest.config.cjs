/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    // preset: 'ts-jest/presets/default-esm',
    resolver: 'ts-jest-resolver',
    verbose: true,
    testEnvironment: 'node',
    collectCoverage: true,
    coverageReporters: ["json", "html"],
    extensionsToTreatAsEsm: ['.ts'],
    transform: {
      '^.+\\.[tj]sx?$': [
        'ts-jest',
        {
          useESM: true,
          tsconfig: 'tsconfig.test.json',
          isolatedModules: true
        },
      ],
    },
  };
  