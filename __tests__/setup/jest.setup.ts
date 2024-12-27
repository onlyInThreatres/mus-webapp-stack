import '@testing-library/jest-dom'
import { testEnv } from './env'

// Log environment once at startup
console.log('🔍 Test Environment:', {
  nodeEnv: process.env.NODE_ENV,
  supabaseUrl: '***', // Masked for security
  hasAnonKey: Boolean(testEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY),
  testMode: testEnv.TEST_MODE
})

// Global teardown
afterAll(async () => {
  // Add global cleanup if needed
  await new Promise(resolve => setTimeout(resolve, 500)) // Allow connections to close
})

// Increase test timeout for Supabase operations
jest.setTimeout(30000)

// Reset mocks between tests
beforeEach(() => {
  jest.clearAllMocks()
})

// Custom matcher for Supabase responses
expect.extend({
  toBeValidSupabaseResponse(received: any) {
    const pass = received && ('data' in received || 'error' in received)
    return {
      message: () => `expected ${received} to be a valid Supabase response`,
      pass
    }
  }
}) 