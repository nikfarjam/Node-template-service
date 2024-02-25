import type { Config } from '@jest/types'

const baseDir = '<rootDir>/src/app/';
const baseTestDir = '<rootDir>/src/test';


const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [
    `<rootDir>/src/app/**/*.ts`
  ],
  testMatch: [
    `${baseTestDir}/**/*.test.ts`,
  ]
}

export default config;