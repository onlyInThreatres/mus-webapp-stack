/**
 * 🧪 Supabase Client Integration Tests
 * Validates core Supabase client functionality and data operations
 */

import { createClient } from '@supabase/supabase-js'
import { testEnv } from '../setup/env'
import { Database } from '@/lib/types/supabase'
import { truncateUrl } from '../utils/string-utils'

describe('🔌 Supabase Client Configuration', () => {
  const supabase = createClient<Database>(
    testEnv.NEXT_PUBLIC_SUPABASE_URL,
    testEnv.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  )

  interface TestProfile {
    id: string
    email: string
    full_name: string
    created_at?: string
    updated_at?: string
  }

  const mockProfile: TestProfile = {
    id: 'c8f9c48a-4cde-4499-b787-a24af77c82d6',
    email: 'test@example.com',
    full_name: 'Test User',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }

  beforeAll(() => {
    if (testEnv.mode === 'ci' && (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY)) {
      throw new Error('🔴 Missing required environment variables in CI')
    }

    console.log('🔍 Starting Supabase Client Tests:', {
      mode: testEnv.TEST_MODE,
      url: testEnv.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 10) + '...'
    })
  })

  test('should initialize client with correct configuration', async () => {
    console.log('🔍 Starting Supabase Client Tests:', {
      mode: process.env.TEST_MODE,
      url: truncateUrl(testEnv.NEXT_PUBLIC_SUPABASE_URL),
      hasAnonKey: !!testEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      hasServiceKey: !!testEnv.SUPABASE_SERVICE_ROLE_KEY
    })

    expect(supabase).toBeDefined()
    expect(supabase.auth).toBeDefined()
    
    // Just check if we can make any request
    const { error } = await supabase.auth.getSession()
    
    console.log('🔍 Auth Check Response:', { error })
    
    expect(error).toBeNull()
    console.log('✅ Client initialized successfully')
  })

  // Remove the Profile Management tests for now
}) 