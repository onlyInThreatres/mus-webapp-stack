import { createClient } from '@supabase/supabase-js'
import { testEnv } from '../setup/env'
import { Database } from '@/lib/types/supabase'

describe('🔗 Supabase Critical Path', () => {
  const supabase = createClient<Database>(
    testEnv.NEXT_PUBLIC_SUPABASE_URL!,
    testEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

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
  })

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