import type { Config } from 'jest'
import nextJest from 'next/jest'

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig: Config = {
  // 🔍 Test environments and projects
  projects: [
    {
      displayName: 'critical',
      testMatch: ['**/__tests__/**/*.(spec|test).[jt]s?(x)'],
      testEnvironment: 'node',
      setupFilesAfterEnv: ['<rootDir>/tests/setup/jest.setup.ts'],
    },
    {
      displayName: 'unit',
      testMatch: ['**/*.test.[jt]s?(x)'],
      testEnvironment: 'jsdom',
      setupFilesAfterEnv: ['<rootDir>/tests/setup/jest.setup.ts'],
    }
  ],
  
  // 🚀 Global configuration
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  
  // ⚡ Performance
  verbose: true,
  collectCoverage: false,
  
  // 🎨 Coverage reporting
  coverageDirectory: '<rootDir>/coverage',
  coverageReporters: ['text', 'lcov', 'clover'],
}

export default createJestConfig(customJestConfig) 