import type { Config } from 'jest'
import nextJest from 'next/jest'

const createJestConfig = nextJest({
  dir: './',
})

const config: Config = {
  // 🔍 Test environments
  testEnvironment: 'node',
  projects: [
    {
      displayName: 'critical',
      testMatch: ['**/__tests__/**/*.(spec|test).[jt]s?(x)'],
      testEnvironment: 'node',
    },
    {
      displayName: 'unit',
      testMatch: ['**/*.test.[jt]s?(x)'],
      testEnvironment: 'jsdom',
    }
  ],
  
  // 🚀 Setup and configuration
  setupFilesAfterEnv: ['<rootDir>/tests/setup/jest.setup.ts'],
  moduleNameMapper: {
    // Handle module aliases
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  
  // ⚡ Performance
  verbose: true,
  collectCoverage: false,
  
  // 🎨 Coverage reporting
  coverageDirectory: '<rootDir>/coverage',
  coverageReporters: ['text', 'lcov', 'clover'],
}

export default createJestConfig(config) 