// Load environment variables
require('dotenv').config({ path: '.env.test' })

const testEnv = {
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.TEST_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.TEST_SUPABASE_ANON_KEY,
  TEST_MODE: process.env.TEST_MODE || 'remote',
}

// Enhanced debugging
const debugInfo = {
  environment: process.env.NODE_ENV,
  ci: Boolean(process.env.CI),
  vars: {
    url: Boolean(testEnv.NEXT_PUBLIC_SUPABASE_URL),
    key: Boolean(testEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY),
    mode: testEnv.TEST_MODE
  },
  paths: {
    cwd: process.cwd(),
    envPath: '.env.test'
  }
}

// Log debug info in CI or when DEBUG is set
if (process.env.CI || process.env.DEBUG) {
  console.log('🔍 Test Environment Debug:', {
    ...debugInfo,
    // Mask sensitive values
    supabaseUrl: testEnv.NEXT_PUBLIC_SUPABASE_URL ? '***' : 'missing',
    supabaseKey: testEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '***' : 'missing'
  })
}

if (!testEnv.NEXT_PUBLIC_SUPABASE_URL || !testEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error(
    '🔴 Missing required Supabase environment variables\n' +
    'Please ensure the following are set:\n' +
    '- NEXT_PUBLIC_SUPABASE_URL or TEST_SUPABASE_URL\n' +
    '- NEXT_PUBLIC_SUPABASE_ANON_KEY or TEST_SUPABASE_ANON_KEY\n' +
    `Current environment: ${process.env.NODE_ENV}`
  )
}

module.exports = { testEnv } 