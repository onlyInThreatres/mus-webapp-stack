/**
 * 🧪 Jest Setup Configuration
 */

import dotenv from 'dotenv'
require('@testing-library/jest-dom')

// 🔧 Load test environment variables
dotenv.config({ path: '.env.test' })

// 🧹 Clear mocks between tests
beforeEach(() => {
  jest.clearAllMocks()
})

// ⏱ Add longer timeout for Supabase operations
jest.setTimeout(10000)

// 🔍 Log environment info for debugging
console.log('Test Environment:', {
  SUPABASE_URL: process.env.TEST_SUPABASE_URL,
  NODE_ENV: process.env.NODE_ENV,
})

// Add any other test setup here