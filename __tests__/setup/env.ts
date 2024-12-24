const testEnv = {
  NEXT_PUBLIC_SUPABASE_URL: process.env.TEST_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.TEST_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  TEST_MODE: process.env.TEST_MODE || 'remote', // 'remote' | 'local' | 'ci'
}

// Safety checks for production URL
if (testEnv.NEXT_PUBLIC_SUPABASE_URL?.includes('production')) {
  throw new Error('🚨 Cannot run tests against production database!')
}

// Validate environment
if (!testEnv.NEXT_PUBLIC_SUPABASE_URL || !testEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('🔴 Missing required Supabase environment variables. Please set TEST_SUPABASE_URL and TEST_SUPABASE_ANON_KEY')
}

// Log connection info (safely)
console.log('🔧 Test Environment:', {
  mode: testEnv.TEST_MODE,
  url: testEnv.NEXT_PUBLIC_SUPABASE_URL,
  hasKey: Boolean(testEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY),
  isDev: testEnv.NEXT_PUBLIC_SUPABASE_URL.includes('dev'),
})

module.exports = { testEnv } 