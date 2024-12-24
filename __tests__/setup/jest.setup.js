// Import necessary test utilities
require('@testing-library/jest-dom')

// Mock fetch globally
global.fetch = jest.fn()

// Reset mocks before each test
beforeEach(() => {
  jest.clearAllMocks()
})

// Clean up after each test
afterEach(() => {
  jest.resetAllMocks()
})

// Log test environment info
console.log('🔍 Test Environment:', {
  nodeEnv: process.env.NODE_ENV,
  testMode: process.env.TEST_MODE || 'local'
})