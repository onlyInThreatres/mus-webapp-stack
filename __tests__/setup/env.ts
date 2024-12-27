// Load environment variables
require('dotenv').config({ path: '.env.test' })

// Define test modes
type TestMode = 'local' | 'remote'

// Environment configuration based on test mode
export const testEnv = {
  // Determine test mode - defaults to local if not specified
  TEST_MODE: (process.env.TEST_MODE || 'local') as TestMode,
  
  // URLs and Keys - select based on test mode
  NEXT_PUBLIC_SUPABASE_URL: process.env.TEST_MODE === 'local' 
    ? process.env.LOCAL_SUPABASE_URL 
    : process.env.NEXT_PUBLIC_SUPABASE_URL,
    
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.TEST_MODE === 'local'
    ? process.env.LOCAL_SUPABASE_ANON_KEY
    : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    
  DATABASE_URL: process.env.TEST_MODE === 'local'
    ? process.env.LOCAL_DATABASE_URL
    : process.env.TEST_DATABASE_URL,
}

// Enhanced debugging with environment awareness
const debugInfo = {
  environment: process.env.NODE_ENV,
  testMode: testEnv.TEST_MODE,
  ci: Boolean(process.env.CI),
  vars: {
    url: Boolean(testEnv.NEXT_PUBLIC_SUPABASE_URL),
    key: Boolean(testEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY),
    dbUrl: Boolean(testEnv.DATABASE_URL)
  }
}

// Validate environment based on test mode
if (testEnv.TEST_MODE === 'local') {
  // Check if local Supabase is running
  const isLocalSupabaseRunning = async () => {
    try {
      const response = await fetch('http://localhost:54321/rest/v1/')
      return response.status !== 404
    } catch {
      return false
    }
  }

  // Log local setup status
  console.log('🔧 Local Test Environment:', {
    mode: 'local',
    supabaseUrl: testEnv.NEXT_PUBLIC_SUPABASE_URL,
    hasKey: Boolean(testEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  })
} else {
  // Validate remote environment variables
  if (!testEnv.NEXT_PUBLIC_SUPABASE_URL || !testEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.error('🔴 Remote Test Environment Error:', {
      ...debugInfo,
      supabaseUrl: testEnv.NEXT_PUBLIC_SUPABASE_URL ? `${testEnv.NEXT_PUBLIC_SUPABASE_URL.substring(0, 8)}...` : 'missing',
      keyLength: testEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY?.length || 0
    })
    throw new Error('Missing required remote Supabase environment variables')
  }

  // Log remote setup status
  console.log('🌎 Remote Test Environment:', {
    mode: 'remote',
    supabaseUrl: `${testEnv.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 8)}...`,
    hasKey: Boolean(testEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  })
}

export { debugInfo } 