import { createClient } from '@supabase/supabase-js'
import { testEnv } from '../setup/env'
import { Database } from '@/lib/types/supabase'

describe('🏥 Supabase Health Checks', () => {
  const supabase = createClient<Database>(
    testEnv.NEXT_PUBLIC_SUPABASE_URL!,
    testEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  test('can connect to database', async () => {
    const { data, error } = await supabase.from('profiles').select('count')
    expect(error).toBeNull()
    expect(data).toBeDefined()
  })
}) 