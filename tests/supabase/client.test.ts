/**
 * 🧪 Supabase Client Tests
 * Tests core functionality of our Supabase setup
 */

import { supabase, testConnection } from '../../lib/supabase/client'
import { db } from '../../lib/supabase/db-helpers'

describe('Supabase Client Configuration', () => {
  test('client is properly initialized', () => {
    expect(supabase).toBeDefined()
    expect(supabase.auth).toBeDefined()
    expect(supabase.from).toBeDefined()
  })

  test('environment variables are configured', () => {
    expect(process.env.NEXT_PUBLIC_SUPABASE_URL).toBeDefined()
    expect(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY).toBeDefined()
  })
})

describe('Database Connection', () => {
  test('can connect to database', async () => {
    const result = await testConnection()
    expect(result).toBe(true)
  })
})

describe('Database Helpers', () => {
  test('profile operations are typed correctly', async () => {
    // Type checking test
    const profile = {
      id: 'test-id',
      email: 'test@example.com',
      is_verified: false
    }
    
    // This is mainly a TypeScript compilation test
    const result = await db.upsertProfile(profile)
    expect(result).toBeNull() // Will be null in test environment
  })
}) 