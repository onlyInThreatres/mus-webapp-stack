import { createClient } from '@supabase/supabase-js'
import { testEnv, hasAdminAccess } from '../tests/setup/env'

describe('Supabase Connection', () => {
  const supabase = createClient(
    testEnv.NEXT_PUBLIC_SUPABASE_URL,
    testEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )

  it('🔗 should connect to Supabase', async () => {
    const { data, error } = await supabase
      .from('_health')
      .select('*')
      .limit(1)
      .single()

    if (error) {
      console.error('🔴 Supabase connection error:', error)
      throw error
    }

    expect(data).toBeDefined()
  })

  // Only run admin tests if we have the service key
  if (hasAdminAccess) {
    describe('Admin Operations', () => {
      const adminClient = createClient(
        testEnv.NEXT_PUBLIC_SUPABASE_URL,
        testEnv.SUPABASE_SERVICE_KEY!
      )

      it('should perform admin operations', async () => {
        // Admin-only tests here
      })
    })
  }
}) 