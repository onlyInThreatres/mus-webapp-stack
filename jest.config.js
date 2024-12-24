/** @type {import('jest').Config} */
const config = {
  verbose: true,
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/__tests__/setup/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest', {
      jsc: {
        parser: {
          syntax: 'typescript',
          tsx: true,
          decorators: true,
        },
        transform: {
          react: {
            runtime: 'automatic',
          },
        },
      },
    }],
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  projects: [
    {
      displayName: '🚨 Critical',
      testMatch: ['<rootDir>/__tests__/critical/**/*.test.ts?(x)'],
      testEnvironment: 'node',
    },
    {
      displayName: '🧪 Unit',
      testMatch: ['<rootDir>/__tests__/unit/**/*.test.ts?(x)'],
      testEnvironment: 'jsdom',
    },
    {
      displayName: '🔗 Integration',
      testMatch: ['<rootDir>/__tests__/integration/**/*.test.ts?(x)'],
      testEnvironment: 'node',
    },
    {
      displayName: '🌐 E2E',
      testMatch: ['<rootDir>/__tests__/e2e/**/*.test.ts?(x)'],
      testEnvironment: 'node',
    }
  ],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'clover'],
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
}

module.exports = config 
