/**
 * 🔧 Test Environment Configuration
 * Handles both local and production test environments
 */

interface TestEnv {
  mode: 'local' | 'ci'
  TEST_MODE: 'local' | 'production'
  NEXT_PUBLIC_SUPABASE_URL: string
  NEXT_PUBLIC_SUPABASE_ANON_KEY: string
  SUPABASE_SERVICE_ROLE_KEY: string
}

// Safe string truncation helper
const truncateUrl = (url?: string) => {
  if (!url) return 'undefined'
  return url.length > 20 ? url.substring(0, 20) + '...' : url
}

// Debug helper
const debugEnv = () => {
  console.log('🔍 Debug Environment Variables:', {
    NODE_ENV: process.env.NODE_ENV,
    TEST_MODE: process.env.TEST_MODE,
    SUPABASE_URL: truncateUrl(process.env.NEXT_PUBLIC_SUPABASE_URL),
    ENV_FILE: process.env.ENV_FILE || 'not set',
    PWD: process.env.PWD, // Current working directory
    // Add presence checks for key variables
    has: {
      NEXT_PUBLIC_SUPABASE_URL: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      SUPABASE_SERVICE_ROLE_KEY: !!process.env.SUPABASE_SERVICE_ROLE_KEY
    }
  })
}

// Environment validation
const validateEnv = () => {
  debugEnv() // Add debug logging
  
  const mode = process.env.TEST_MODE === 'production' ? 'production' : 'local'
  
  if (mode === 'production') {
    const required = [
      'NEXT_PUBLIC_SUPABASE_URL',
      'NEXT_PUBLIC_SUPABASE_ANON_KEY',
      'SUPABASE_SERVICE_ROLE_KEY'
    ]
    
    const missing = required.filter(key => !process.env[key])
    if (missing.length > 0) {
      console.error('🔴 Environment Check Failed:')
      console.error('Missing:', missing)
      console.error('Current working directory:', process.cwd())
      console.error('Available env vars:', Object.keys(process.env)
        .filter(key => key.includes('SUPABASE') || key.includes('TEST'))
        .map(key => `${key}: ${truncateUrl(process.env[key])}`))
      throw new Error(`🔴 Missing required environment variables for production tests: ${missing.join(', ')}`)
    }
  }
  
  return mode
}

export const testEnv: TestEnv = {
  mode: process.env.CI ? 'ci' : 'local',
  TEST_MODE: validateEnv(),
  NEXT_PUBLIC_SUPABASE_URL: process.env.TEST_MODE === 'production'
    ? process.env.NEXT_PUBLIC_SUPABASE_URL!
    : 'http://localhost:54321',
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.TEST_MODE === 'production'
    ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0',
  SUPABASE_SERVICE_ROLE_KEY: process.env.TEST_MODE === 'production'
    ? process.env.SUPABASE_SERVICE_ROLE_KEY!
    : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU'
}

// Log environment details
console.log('🔧 Test Environment:', {
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 8) + '...',
  HAS_ANON_KEY: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  TEST_MODE: process.env.TEST_MODE,
  NODE_ENV: process.env.NODE_ENV
}) 