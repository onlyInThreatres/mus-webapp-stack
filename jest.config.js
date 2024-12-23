/** @type {import('jest').Config} */
const config = {
  verbose: true,
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/tests/setup/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  transform: {
    '^.+\\.(js|jsx)$': ['@swc/jest'],
  },
  transformIgnorePatterns: [
    'node_modules/(?!(@supabase/supabase-js)/)',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  projects: [
    {
      displayName: '🚨 Critical',
      testMatch: ['<rootDir>/__tests__/critical/**/*.test.js'],
      testEnvironment: 'node',
    },
    {
      displayName: '🧪 Unit',
      testMatch: ['<rootDir>/__tests__/unit/**/*.test.js'],
      testEnvironment: 'jsdom',
    },
    {
      displayName: '🔗 Integration',
      testMatch: ['<rootDir>/__tests__/integration/**/*.test.js'],
      testEnvironment: 'node',
    },
    {
      displayName: '🌐 E2E',
      testMatch: ['<rootDir>/__tests__/e2e/**/*.test.js'],
      testEnvironment: 'node',
    }
  ],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'clover'],
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
}

module.exports = config 