// 🧪 API Route Tests
const { testEnv } = require('../../setup/env')

describe('API Connection Tests', () => {
  test('environment is configured', () => {
    expect(testEnv.NEXT_PUBLIC_SUPABASE_URL).toBeDefined()
    expect(testEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY).toBeDefined()
  })
}) 