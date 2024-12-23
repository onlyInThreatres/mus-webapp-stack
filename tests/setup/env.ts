// 🔧 Test environment configuration
const requiredEnvVars = {
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://localhost:54321',
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...',
}

// Optional environment variables
const optionalEnvVars = {
  SUPABASE_SERVICE_KEY: process.env.SUPABASE_SERVICE_KEY // Only needed for admin operations
}

// 🔍 Validate required environment variables
Object.entries(requiredEnvVars).forEach(([key, value]) => {
  if (!value) {
    throw new Error(`⚠️ Missing ${key} environment variable`)
  }
})

export const testEnv = {
  ...requiredEnvVars,
  ...optionalEnvVars
}

// 🔍 Helper to check if we have admin access
export const hasAdminAccess = Boolean(optionalEnvVars.SUPABASE_SERVICE_KEY) 