// 🔗 Supabase Connection Test
const { createClient } = require('@supabase/supabase-js')
const { testEnv, isProduction } = require('../tests/setup/env')

describe('Supabase Connection', () => {
  // 🏗️ Initialize Supabase client
  const supabase = createClient(
    testEnv.NEXT_PUBLIC_SUPABASE_URL || '',
    testEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  )

  it('🔗 should connect to Supabase', async () => {
    console.log(`🔍 Testing connection to ${isProduction ? 'production' : 'local'} Supabase`)
    
    const { data, error } = await supabase.auth.getSession()
    
    if (error) {
      console.error('🔴 Supabase connection error:', error)
      throw error
    }

    console.log('🟢 Successfully connected to Supabase')
    expect(data).toBeDefined()
  })
}) 