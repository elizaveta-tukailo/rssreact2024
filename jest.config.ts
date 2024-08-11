import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

/** @type {import('jest').Config} */
const config = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  testEnvironment: 'jest-environment-jsdom',
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}', 
    '!src/**/*.d.ts',
    '!src/common/**',
    '!**/*.config.{js,ts}', 
    '!src/testSetup/*.{ts,tsx}', 
    '!src/hooks/useStoreHooks.ts'
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov'],
};

export default createJestConfig(config);