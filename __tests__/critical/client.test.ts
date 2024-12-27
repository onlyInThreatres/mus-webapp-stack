/**
 * 🧪 Supabase Client Tests
 * Tests core functionality of our Supabase setup
 */

import { createClient } from '@supabase/supabase-js'
import { testEnv } from '../setup/env'
import { Database } from '@/lib/types/supabase'

describe('Supabase Client Tests', () => {
  // Use service_role key for testing to bypass RLS
  const supabase = createClient<Database>(
    testEnv.NEXT_PUBLIC_SUPABASE_URL!,
    testEnv.SUPABASE_SERVICE_ROLE_KEY!, // Use service role key instead of anon key
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
    // Validate service role key
    if (!testEnv.SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error('🔴 Missing SUPABASE_SERVICE_ROLE_KEY for tests')
    }
  })

  test('client is properly configured', () => {
    expect(supabase).toBeDefined()
    expect(supabase.auth).toBeDefined()
  })

  test('can upsert profile', async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .upsert(mockProfile)
        .select()

      if (error) {
        console.error('🔴 Upsert error:', error)
      }

      expect(error).toBeNull()
      expect(data).toBeDefined()
    } catch (err) {
      console.error('🔴 Test failed:', err)
      throw err
    }
  })

  // Proper teardown
  afterAll(async () => {
    try {
      // Clean up test data
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', mockProfile.id)
      
      if (error) {
        console.error('🔴 Cleanup error:', error)
      }

      // Sign out and remove auth state
      await supabase.auth.signOut()
      
      // Allow time for connections to close gracefully
      await new Promise(resolve => setTimeout(resolve, 1000))
    } catch (err) {
      console.error('🔴 Teardown error:', err)
    }
  })
}) 