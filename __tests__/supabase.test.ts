import { createClient } from '@supabase/supabase-js'

describe('Supabase Connection', () => {
  const supabase = createClient(
    process.env.TEST_SUPABASE_URL || '',
    process.env.TEST_SUPABASE_ANON_KEY || ''
  )

  it('🔗 should connect to Supabase', async () => {
    const { data, error } = await supabase.from('profiles').select('*').limit(1)
    expect(error).toBeNull()
    expect(Array.isArray(data)).toBe(true)
  })
}) 