// 🔗 Supabase Connection Test
const { createClient } = require('@supabase/supabase-js')
const { testEnv, isProduction } = require('../tests/setup/env')

describe('Supabase Connection', () => {
  // 🔍 Debug environment variables
  beforeAll(() => {
    console.log('🔧 Test Environment:', {
      url: testEnv.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 10) + '...',
      hasKey: Boolean(testEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY),
      urlLength: testEnv.NEXT_PUBLIC_SUPABASE_URL?.length || 0,
      keyLength: testEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY?.length || 0
    })

    // 🚨 Validate required environment variables
    if (!testEnv.NEXT_PUBLIC_SUPABASE_URL) {
      throw new Error('NEXT_PUBLIC_SUPABASE_URL is required for tests')
    }
    if (!testEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      throw new Error('NEXT_PUBLIC_SUPABASE_ANON_KEY is required for tests')
    }
  })

  // 🧪 Test Supabase connection
  it('should connect to Supabase', async () => {
    // 🏗️ Initialize Supabase client
    const supabase = createClient(
      testEnv.NEXT_PUBLIC_SUPABASE_URL,
      testEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )

    console.log(`🔍 Testing connection to ${isProduction ? 'production' : 'test'} Supabase`)
    
    const { data, error } = await supabase.auth.getSession()
    
    if (error) {
      console.error('🔴 Supabase connection error:', error)
      throw error
    }

    console.log('🟢 Successfully connected to Supabase')
    expect(data).toBeDefined()
  })
}) 