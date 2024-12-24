/** @type {import('jest').Config} */
const config = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/__tests__/setup/jest.setup.js'],
  moduleDirectories: ['node_modules', '<rootDir>'],
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest'],
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  testMatch: [
    '**/__tests__/**/*.test.[jt]s?(x)',
  ],
  projects: [
    {
      displayName: '🚨 Critical',
      testMatch: ['**/__tests__/critical/**/*.test.[jt]s?(x)'],
    },
    {
      displayName: '🔗 Integration',
      testMatch: ['**/__tests__/integration/**/*.test.[jt]s?(x)'],
    },
    {
      displayName: '🧪 Unit',
      testMatch: ['**/__tests__/unit/**/*.test.[jt]s?(x)'],
    },
  ],
}

module.exports = config 
