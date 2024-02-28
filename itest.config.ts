import type { Config } from '@jest/types'

const baseTestDir = '<rootDir>/src/test';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [
    `<rootDir>/src/app/**/*.ts`
  ],
  coverageDirectory: '<rootDir>/coverage-integration',
  testMatch: [
    `${baseTestDir}/**/*.itest.ts`,
  ],
}

export default config;