// 🔧 Test environment configuration
const requiredEnvVars = {
  // Use production URLs for deployed environment, fallback to local for development
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://pqcgagpijzghdedxwemi.supabase.co',
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBxY2dhZ3BpanpnaGRlZHh3ZW1pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ5MTY5NDYsImV4cCI6MjA1MDQ5Mjk0Nn0.qeEdgrHqdMiDgv5OIj043G5tck0MSvHDLYi6BHyuEmE'
}

// 🔍 Validate required environment variables
Object.entries(requiredEnvVars).forEach(([key, value]) => {
  if (!value) {
    throw new Error(`⚠️ Missing ${key} environment variable`)
  }
})

// 📝 Log the environment we're using (but mask sensitive values)
console.log('🔧 Test Environment:', {
  SUPABASE_URL: requiredEnvVars.NEXT_PUBLIC_SUPABASE_URL,
  USING_PRODUCTION: requiredEnvVars.NEXT_PUBLIC_SUPABASE_URL.includes('pqcgagpijzghdedxwemi')
})

export const testEnv = {
  ...requiredEnvVars
}

// 🔍 Helper to check if we're using production Supabase
export const isProduction = testEnv.NEXT_PUBLIC_SUPABASE_URL.includes('pqcgagpijzghdedxwemi')