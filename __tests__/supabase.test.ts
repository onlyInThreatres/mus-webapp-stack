import { createClient } from '@supabase/supabase-js'
import { testEnv } from '../tests/setup/env'

describe('Supabase Connection', () => {
  const supabase = createClient(
    testEnv.SUPABASE_URL,
    testEnv.SUPABASE_ANON_KEY
  )

  it('🔗 should connect to Supabase', async () => {
    // First check if we can connect
    const { error: healthError } = await supabase.from('_health').select('*')
    expect(healthError).toBeNull()

    // Then try the profiles query
    const { data, error } = await supabase.from('profiles').select('*').limit(1)
    expect(error).toBeNull()
    expect(Array.isArray(data)).toBe(true)
  })
}) 