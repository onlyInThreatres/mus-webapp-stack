/**
 * 🔧 Test Environment Configuration
 * Handles both local and CI test environments
 */

interface TestEnv {
  mode: 'local' | 'ci'
  TEST_MODE: 'local' | 'production'
  NEXT_PUBLIC_SUPABASE_URL: string
  NEXT_PUBLIC_SUPABASE_ANON_KEY: string
  SUPABASE_SERVICE_ROLE_KEY: string
}

export const testEnv: TestEnv = {
  mode: process.env.CI ? 'ci' : 'local',
  TEST_MODE: process.env.TEST_MODE === 'production' ? 'production' : 'local',
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
  mode: testEnv.mode,
  testMode: testEnv.TEST_MODE,
  supabaseUrl: testEnv.NEXT_PUBLIC_SUPABASE_URL.substring(0, 20) + '...',
  hasKey: Boolean(testEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY),
  hasServiceKey: Boolean(testEnv.SUPABASE_SERVICE_ROLE_KEY)
}) 