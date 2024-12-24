import dotenv from 'dotenv'
import { testEnv } from './env'
import { cleanupTestClient } from './supabase-helper'

// Load test environment variables
dotenv.config({ path: '.env.test' })

// Extend timeout for Supabase operations
jest.setTimeout(10000)

beforeAll(() => {
  // Log test environment (safely)
  console.log('🔧 Test Environment:', {
    supabaseUrl: testEnv.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 10) + '...',
    hasKey: Boolean(testEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  })
})

afterEach(() => {
  jest.clearAllMocks()
})

afterAll(() => {
  cleanupTestClient()
}) 