import { createClient } from '@supabase/supabase-js'
import { testEnv, isProduction } from '../tests/setup/env'

describe('Supabase Connection', () => {
  const supabase = createClient(
    testEnv.NEXT_PUBLIC_SUPABASE_URL,
    testEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )

  it('🔗 should connect to Supabase', async () => {
    console.log(`🔍 Testing connection to ${isProduction ? 'production' : 'local'} Supabase`)
    
    // Try a simple query that should work with anon key
    const { data, error } = await supabase
      .from('profiles')
      .select('id')
      .limit(1)

    if (error) {
      console.error('🔴 Supabase connection error:', error)
      throw error
    }

    expect(Array.isArray(data)).toBe(true)
    console.log('🟢 Successfully connected to Supabase')
  })
}) 