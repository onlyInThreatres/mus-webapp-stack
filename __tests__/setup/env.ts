/**
 * 🔧 Test Environment Configuration
 * Handles both local and production test environments
 */

type TestEnv = {
  mode: 'local' | 'ci'
  TEST_MODE: 'local' | 'production'
  NEXT_PUBLIC_SUPABASE_URL: string
  NEXT_PUBLIC_SUPABASE_ANON_KEY: string
  SUPABASE_SERVICE_ROLE_KEY: string
}

const getTestEnv = (): TestEnv => {
  // Default values for local development
  const LOCAL_DEFAULTS = {
    NEXT_PUBLIC_SUPABASE_URL: 'http://localhost:54321',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0',
    SUPABASE_SERVICE_ROLE_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU'
  }

  // Debug helper
  const debugEnv = () => {
    console.log('🔍 Detailed Environment:', {
      NODE_ENV: process.env.NODE_ENV,
      TEST_MODE: process.env.TEST_MODE,
      CI: process.env.CI,
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 10) + '...',
      HAS_ANON_KEY: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      HAS_SERVICE_KEY: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      ENV_KEYS: Object.keys(process.env).filter(key => key.includes('SUPABASE') || key.includes('TEST')),
    })
  }

  // Log initial state
  debugEnv()

  // If we're in CI but missing variables, try to use local defaults
  if (process.env.CI === 'true') {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.log('⚠️ Missing CI variables, falling back to local defaults')
      return {
        mode: 'ci',
        TEST_MODE: 'local',
        NEXT_PUBLIC_SUPABASE_URL: LOCAL_DEFAULTS.NEXT_PUBLIC_SUPABASE_URL,
        NEXT_PUBLIC_SUPABASE_ANON_KEY: LOCAL_DEFAULTS.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        SUPABASE_SERVICE_ROLE_KEY: LOCAL_DEFAULTS.SUPABASE_SERVICE_ROLE_KEY
      }
    }

    return {
      mode: 'ci',
      TEST_MODE: 'production',
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY
    }
  }

  // For local development
  return {
    mode: 'local',
    TEST_MODE: process.env.TEST_MODE === 'production' ? 'production' : 'local',
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || LOCAL_DEFAULTS.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || LOCAL_DEFAULTS.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY || LOCAL_DEFAULTS.SUPABASE_SERVICE_ROLE_KEY
  }
}

export const testEnv = getTestEnv()

// Log final configuration
console.log('✅ Final Test Environment:', {
  mode: testEnv.mode,
  TEST_MODE: testEnv.TEST_MODE,
  SUPABASE_URL: testEnv.NEXT_PUBLIC_SUPABASE_URL.substring(0, 10) + '...',
  HAS_KEYS: {
    ANON: !!testEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    SERVICE: !!testEnv.SUPABASE_SERVICE_ROLE_KEY
  }
}) 