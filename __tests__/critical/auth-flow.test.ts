// 🔐 Authentication Flow Tests
const { getSupabaseClient } = require('../setup/supabase-helper')

describe('Authentication', () => {
  const supabase = getSupabaseClient()

  it('should be configured with test credentials', () => {
    expect(supabase).toBeDefined()
  })

  test('should handle auth session check', async () => {
    const { data, error } = await supabase.auth.getSession()
    
    console.log('🔍 Auth session check:', {
      hasData: Boolean(data),
      error: error || null
    })

    // We expect either a valid session or a null session without error
    if (error) {
      expect(error.message).toMatch(/Invalid JWT/)
    } else {
      expect(data).toBeDefined()
      // Session might be null which is fine for testing
      expect(data.session).toBeDefined()
    }
  })
}) 