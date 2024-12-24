// 🔐 Authentication Flow Tests
const { getTestClient } = require('../setup/supabase-helper')
const { testEnv } = require('../setup/env')

describe('Authentication', () => {
  const supabase = getTestClient()

  test('should handle auth session check', async () => {
    const { data, error } = await supabase.auth.getSession()
    console.log('🔍 Auth session check:', { hasData: !!data, error })
    expect(error).toBeNull()
    expect(data).toBeDefined()
  })
}) 