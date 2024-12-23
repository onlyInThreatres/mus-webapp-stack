import type { Config } from 'jest'
import nextJest from 'next/jest'

const createJestConfig = nextJest({
  dir: './',
})

const config: Config = {
  testEnvironment: 'node',
  setupFiles: ['<rootDir>/jest.setup.ts'],
  testMatch: ['**/__tests__/**/*.test.ts'],
}

export default createJestConfig(config) 