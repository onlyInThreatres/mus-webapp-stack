/**
 * 🧪 Supabase Client Integration Tests
 * Validates core Supabase client functionality and data operations
 */

import { createClient } from '@supabase/supabase-js'
import { testEnv } from '../setup/env'
import { Database } from '@/lib/types/supabase'

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

  test('should initialize client with correct configuration', () => {
    expect(supabase).toBeDefined()
    expect(supabase.auth).toBeDefined()
    console.log('✅ Client initialized successfully')
  })

  describe('📝 Profile Management', () => {
    test('should create and retrieve user profile', async () => {
      const { data, error } = await supabase
        .from('profiles')
        .upsert(mockProfile)
        .select()

      if (error) {
        console.error('🔴 Profile creation failed:', error)
      }

      expect(error).toBeNull()
      expect(data).toBeDefined()
      console.log('✅ Profile created successfully')
    })
  })

  afterAll(async () => {
    try {
      console.log('🧹 Cleaning up test data...')
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', mockProfile.id)
      
      if (error) {
        console.error('🔴 Cleanup error:', error)
      } else {
        console.log('✅ Test data cleaned up successfully')
      }

      await supabase.auth.signOut()
      await new Promise(resolve => setTimeout(resolve, 1000))
    } catch (err) {
      console.error('🔴 Teardown error:', err)
    }
  })
}) 