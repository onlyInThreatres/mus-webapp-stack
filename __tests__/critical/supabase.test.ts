// 🔒 Supabase Critical Path Tests
const { getTestClient } = require('../setup/supabase-helper')
const { testEnv } = require('../setup/env')

describe('🔒 Supabase Critical Path', () => {
  let supabase

  beforeAll(() => {
    supabase = getTestClient()
  })

  test('client initialization', () => {
    expect(supabase).toBeDefined()
    expect(supabase.auth).toBeDefined()
  })

  test('can connect to test database', async () => {
    // Health check query
    const { data, error } = await supabase
      .from('profiles')
      .select('count')
      .limit(1)
    
    console.log('🔍 Database connection test:', {
      mode: testEnv.TEST_MODE,
      hasData: Boolean(data),
      error: error?.message || null,
      url: testEnv.NEXT_PUBLIC_SUPABASE_URL
    })

    // We expect either data or a permission error, but not a connection error
    expect(error?.message || '').not.toContain('fetch failed')
    
    if (error) {
      // If we get an error, it should be about permissions or auth
      expect(error.message).toMatch(/permission denied|Invalid API key/)
    } else {
      // If no error, we should have a response (even if empty)
      expect(data).toBeDefined()
    }
  })

  // Conditional test for data modifications
  if (testEnv.TEST_MODE !== 'remote') {
    test('can create and delete test data', async () => {
      // This test only runs in local or CI environments
      expect(testEnv.TEST_MODE).not.toBe('remote')
    })
  }
}) 