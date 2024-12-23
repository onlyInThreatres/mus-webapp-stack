import { createClient } from '@supabase/supabase-js'
import { testEnv, isProduction } from '../tests/setup/env'

describe('Supabase Connection', () => {
  const supabase = createClient(
    testEnv.NEXT_PUBLIC_SUPABASE_URL,
    testEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )

  it('🔗 should connect to Supabase', async () => {
    console.log(`🔍 Testing connection to ${isProduction ? 'production' : 'local'} Supabase`)
    
    // Try to get auth configuration - this should work with anon key
    const { data, error } = await supabase.auth.getSession()
    
    if (error) {
      console.error('🔴 Supabase connection error:', error)
      throw error
    }

    // We expect data to be null for no session, but not undefined
    console.log('🟢 Successfully connected to Supabase')
    expect(data).toBeDefined()
  })
}) 