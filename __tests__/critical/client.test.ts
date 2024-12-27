/**
 * 🧪 Supabase Client Integration Tests
 * Validates core Supabase client functionality and data operations
 */

import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/lib/types/supabase'
import { testEnv } from '../setup/env'

describe('🔌 Supabase Client Configuration', () => {
  let supabase: ReturnType<typeof createClient<Database>>

  beforeAll(() => {
    if (!testEnv.NEXT_PUBLIC_SUPABASE_URL || !testEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      throw new Error('Missing required Supabase configuration')
    }

    // Initialize client with proper types
    supabase = createClient<Database>(
      testEnv.NEXT_PUBLIC_SUPABASE_URL,
      testEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )
  })

  afterAll(async () => {
    if (supabase) {
      await supabase.auth.signOut()
      await new Promise(resolve => setTimeout(resolve, 100))
    }
  })

  test('should initialize client with correct configuration', async () => {
    console.log('🔍 Starting Supabase Client Tests:', {
      mode: testEnv.TEST_MODE,
      url: testEnv.NEXT_PUBLIC_SUPABASE_URL.substring(0, 10) + '...',
      hasAnonKey: !!testEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY
    })

    expect(supabase).toBeDefined()
    expect(supabase.auth).toBeDefined()
    
    const { error } = await supabase.auth.getSession()
    console.log('🔍 Auth Check Response:', { error })
    
    expect(error).toBeNull()
    console.log('✅ Client initialized successfully')
  })
}) 