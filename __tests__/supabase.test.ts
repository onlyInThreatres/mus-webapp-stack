import { createClient } from '@supabase/supabase-js'
import { testEnv, isProduction } from '../tests/setup/env'

describe('Supabase Connection', () => {
  const supabase = createClient(
    testEnv.NEXT_PUBLIC_SUPABASE_URL,
    testEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )

  it('🔗 should connect to Supabase', async () => {
    console.log(`🔍 Testing connection to ${isProduction ? 'production' : 'local'} Supabase`)
    
    // First check if we can connect at all
    const { error: healthError } = await supabase.from('_health').select('*')
    
    if (healthError) {
      console.error('🔴 Supabase health check failed:', healthError)
      throw healthError
    }

    console.log('🟢 Successfully connected to Supabase')
  })

  // Separate test for profiles table
  it('📋 should query profiles table if it exists', async () => {
    // Check if profiles table exists
    const { error: tableError } = await supabase
      .from('profiles')
      .select('count')
      .limit(1)
      .single()

    if (tableError?.code === '42P01') {
      console.warn('⚠️ Profiles table does not exist yet - skipping test')
      return
    }

    if (tableError) {
      console.error('🔴 Unexpected error:', tableError)
      throw tableError
    }

    console.log('🟢 Successfully queried profiles table')
  })
}) 