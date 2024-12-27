import '@testing-library/jest-dom'
import { testEnv } from './env'

// Configure longer timeout for Supabase operations
jest.setTimeout(10000)

// Reset mocks between tests
beforeEach(() => {
  jest.clearAllMocks()
})

// Log test environment on startup
beforeAll(() => {
  console.log('🔍 Test Environment:', {
    nodeEnv: process.env.NODE_ENV,
    supabaseUrl: testEnv.NEXT_PUBLIC_SUPABASE_URL ? '***' : 'missing',
    hasAnonKey: Boolean(testEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY),
    testMode: testEnv.TEST_MODE
  })
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