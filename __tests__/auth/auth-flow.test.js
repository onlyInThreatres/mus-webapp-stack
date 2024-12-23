// 🔐 Authentication Flow Tests
const { createClient } = require('@supabase/supabase-js')
const { testEnv } = require('../../tests/setup/env')

describe('Authentication', () => {
  const supabase = createClient(
    testEnv.NEXT_PUBLIC_SUPABASE_URL,
    testEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )

  it('🔑 should handle auth session check', async () => {
    const { data, error } = await supabase.auth.getSession()
    expect(error).toBeNull()
    expect(data).toBeDefined()
  })

  // Skip actual login test for now as we don't have a test user
  it.skip('🔑 should handle sign in with email', async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email: 'test@example.com',
      password: 'test123'
    })
    expect(error).toBeNull()
  })
}) 