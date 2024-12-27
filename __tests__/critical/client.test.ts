/**
 * 🧪 Supabase Client Tests
 * Tests core functionality of our Supabase setup
 */

import { testEnv } from '../setup/env'
import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/lib/types/supabase'

describe('Supabase Client Configuration', () => {
  const supabase = createClient<Database>(
    testEnv.NEXT_PUBLIC_SUPABASE_URL,
    testEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )

  test('client is properly initialized', () => {
    expect(supabase).toBeDefined()
    expect(supabase.auth).toBeDefined()
    expect(supabase.from).toBeDefined()
  })

  test('environment variables are configured', () => {
    // Log masked values for debugging
    console.log('🔍 Test Environment:', {
      url: testEnv.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 8) + '...',
      hasKey: Boolean(testEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY),
      keyLength: testEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY?.length
    })
    
    expect(testEnv.NEXT_PUBLIC_SUPABASE_URL).toBeDefined()
    expect(testEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY).toBeDefined()
  })

  test('can connect to database', async () => {
    try {
      const { data, error } = await supabase.from('profiles').select('count').single()
      
      if (error) {
        console.error('🔴 Database connection error:', {
          message: error.message,
          hint: error.hint,
          details: error.details
        })
        throw error
      }

      console.log('🟢 Successfully connected to database')
      expect(error).toBeNull()
      expect(data).toBeDefined()
    } catch (err) {
      console.error('🔴 Test failed:', err)
      throw err
    }
  })
})

describe('Database Helpers', () => {
  const supabase = createClient<Database>(
    testEnv.NEXT_PUBLIC_SUPABASE_URL,
    testEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )

  // Mock database helper functions
  const db = {
    upsertProfile: async (profile: any) => {
      const { data, error } = await supabase
        .from('profiles')
        .upsert(profile)
        .select()
        .single()
      
      if (error) throw error
      return data
    }
  }

  test('profile operations are typed correctly', async () => {
    const profile = {
      id: 'test-id',
      email: 'test@example.com',
      is_verified: false
    }
    
    // Mock the response since we're just testing types
    jest.spyOn(supabase, 'from').mockImplementation(() => ({
      upsert: () => ({
        select: () => ({
          single: () => Promise.resolve({ data: null, error: null })
        })
      })
    } as any))

    const result = await db.upsertProfile(profile)
    expect(result).toBeNull() // Will be null due to our mock
  })
}) 