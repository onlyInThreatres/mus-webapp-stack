/** @type {import('jest').Config} */
const config = {
  verbose: true,
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/tests/setup/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest'],
  },
  projects: [
    {
      displayName: 'critical',
      testMatch: ['<rootDir>/__tests__/**/*.test.ts'],
    },
  ],
}

module.exports = config 