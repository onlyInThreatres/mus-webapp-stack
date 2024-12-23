/** @type {import('jest').Config} */
const config = {
  verbose: true,
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/tests/setup/jest.setup.js'],
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
  transformIgnorePatterns: [
    'node_modules/(?!(@supabase/supabase-js)/)',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  projects: [
    {
      displayName: 'critical',
      testMatch: ['<rootDir>/__tests__/**/*.test.js'],
    },
    {
      displayName: 'components',
      testMatch: ['<rootDir>/__tests__/components/**/*.test.js'],
    },
    {
      displayName: 'api',
      testMatch: ['<rootDir>/__tests__/api/**/*.test.js'],
    },
    {
      displayName: 'auth',
      testMatch: ['<rootDir>/__tests__/auth/**/*.test.js'],
    }
  ],
  preset: 'ts-jest',
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
}

module.exports = config 