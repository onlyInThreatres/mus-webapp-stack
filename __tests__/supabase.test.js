// 🔗 Supabase Connection Test
const { createClient } = require('@supabase/supabase-js')
const { testEnv } = require('../tests/setup/env')

describe('Supabase Connection', () => {
  let supabase

  // 🔧 Setup before tests
  beforeAll(() => {
    // 🔍 Debug environment variables
    console.log('Test Environment:', {
      url: testEnv.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 10) + '...',
      hasKey: Boolean(testEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY),
    })

    // 🚨 Validate required environment variables
    if (!testEnv.NEXT_PUBLIC_SUPABASE_URL || !testEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      throw new Error('Missing required Supabase environment variables')
    }

    // 🏗️ Initialize Supabase client
    supabase = createClient(
      testEnv.NEXT_PUBLIC_SUPABASE_URL,
      testEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )
  })

  // 🧪 Test Supabase connection
  it('should connect to Supabase', async () => {
    const { data, error } = await supabase.auth.getSession()
    
    if (error) {
      console.error('🔴 Supabase connection error:', error)
      throw error
    }

    console.log('🟢 Successfully connected to Supabase')
    expect(data).toBeDefined()
  })
}) 