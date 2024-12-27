// Load environment variables
require('dotenv').config({ path: '.env.test' })

// Define test modes
type TestMode = 'local' | 'remote'

// Environment configuration based on test mode
export const testEnv = {
  ...process.env,
  TEST_MODE: process.env.TEST_MODE || 'local',
  // Use different URLs and keys based on TEST_MODE
  NEXT_PUBLIC_SUPABASE_URL: process.env.TEST_MODE === 'remote' 
    ? process.env.TEST_SUPABASE_URL 
    : 'http://localhost:54321',
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.TEST_MODE === 'remote'
    ? process.env.TEST_SUPABASE_ANON_KEY
    : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0',
  SUPABASE_SERVICE_ROLE_KEY: process.env.TEST_MODE === 'remote'
    ? process.env.SUPABASE_SERVICE_ROLE_KEY
    : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU',
  DATABASE_URL: process.env.TEST_MODE === 'remote'
    ? process.env.TEST_DATABASE_URL
    : 'postgresql://postgres:postgres@localhost:54321/postgres'
}

// Enhanced debugging with environment awareness
const debugInfo = {
  environment: process.env.NODE_ENV,
  testMode: testEnv.TEST_MODE,
  ci: Boolean(process.env.CI),
  vars: {
    url: Boolean(testEnv.NEXT_PUBLIC_SUPABASE_URL),
    key: Boolean(testEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY),
    serviceKey: Boolean(testEnv.SUPABASE_SERVICE_ROLE_KEY),
    dbUrl: Boolean(testEnv.DATABASE_URL)
  }
}

// Validate environment based on test mode
if (testEnv.TEST_MODE === 'local') {
  // Log local setup status
  console.log('🔧 Local Test Environment:', {
    mode: 'local',
    supabaseUrl: testEnv.NEXT_PUBLIC_SUPABASE_URL,
    hasKey: Boolean(testEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY),
    hasServiceKey: Boolean(testEnv.SUPABASE_SERVICE_ROLE_KEY)
  })
} else {
  // Validate remote environment variables
  if (!testEnv.NEXT_PUBLIC_SUPABASE_URL || !testEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY || !testEnv.SUPABASE_SERVICE_ROLE_KEY) {
    console.error('🔴 Remote Test Environment Error:', {
      ...debugInfo,
      supabaseUrl: testEnv.NEXT_PUBLIC_SUPABASE_URL ? `${testEnv.NEXT_PUBLIC_SUPABASE_URL.substring(0, 8)}...` : 'missing',
      keyLength: testEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY?.length || 0,
      serviceKeyLength: testEnv.SUPABASE_SERVICE_ROLE_KEY?.length || 0
    })
    throw new Error('Missing required remote Supabase environment variables')
  }

  // Log remote setup status
  console.log('🌎 Remote Test Environment:', {
    mode: 'remote',
    supabaseUrl: `${testEnv.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 8)}...`,
    hasKey: Boolean(testEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY),
    hasServiceKey: Boolean(testEnv.SUPABASE_SERVICE_ROLE_KEY)
  })
}

export { debugInfo } 