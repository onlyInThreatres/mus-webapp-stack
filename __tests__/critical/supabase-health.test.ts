import { createClient } from '@supabase/supabase-js'
import { testEnv } from '../setup/env'
import { Database } from '@/lib/types/supabase'

describe('🏥 Supabase Health Checks', () => {
  const supabase = createClient<Database>(
    testEnv.NEXT_PUBLIC_SUPABASE_URL!,
    testEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  test('can connect to database', async () => {
    console.log('🔍 Testing connection with:', {
      url: testEnv.NEXT_PUBLIC_SUPABASE_URL,
      hasAnonKey: !!testEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      hasServiceKey: !!testEnv.SUPABASE_SERVICE_ROLE_KEY
    })

    // Just check if we can make any request
    const { error } = await supabase.auth.getSession()
    
    console.log('🔍 Health Check Response:', { error })
    
    expect(error).toBeNull()
    console.log('✅ Database connection successful')
  })
}) 