import { createClient } from '@supabase/supabase-js'
import { testEnv } from '../setup/env'
import type { Database } from '../../lib/types/supabase'

describe('Authentication', () => {
  const supabase = createClient<Database>(
    testEnv.NEXT_PUBLIC_SUPABASE_URL,
    testEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )

  it('🔑 should handle auth session check', async () => {
    const { data, error } = await supabase.auth.getSession()
    expect(error).toBeNull()
    expect(data).toBeDefined()
  })

  it.skip('🔑 should handle sign in with email', async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email: 'test@example.com',
      password: 'test123'
    })
    expect(error).toBeNull()
  })
}) 