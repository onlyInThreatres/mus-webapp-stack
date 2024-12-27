/** @type {import('jest').Config} */
const config = {
  verbose: true,
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/__tests__/setup/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': ['@swc/jest'],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  projects: [
    {
      displayName: 'Critical',
      testMatch: ['<rootDir>/__tests__/critical/**/*.(test|spec).(ts|tsx)'],
      testEnvironment: 'node',
    },
    {
      displayName: 'Unit',
      testMatch: ['<rootDir>/__tests__/unit/**/*.(test|spec).(ts|tsx)'],
      testEnvironment: 'jsdom',
    },
    {
      displayName: 'Integration',
      testMatch: ['<rootDir>/__tests__/integration/**/*.(test|spec).(ts|tsx)'],
      testEnvironment: 'node',
    },
    {
      displayName: 'E2E',
      testMatch: ['<rootDir>/__tests__/e2e/**/*.(test|spec).(ts|tsx)'],
      testEnvironment: 'node',
    }
  ],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{ts,tsx}'
  ]
}

module.exports = config 