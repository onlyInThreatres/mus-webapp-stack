// 🔧 Test environment configuration
type EnvVars = {
  NEXT_PUBLIC_SUPABASE_URL: string | undefined;
  NEXT_PUBLIC_SUPABASE_ANON_KEY: string | undefined;
}

const requiredEnvVars: EnvVars = {
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
}

// 🔍 Validate required environment variables
Object.entries(requiredEnvVars).forEach(([key, value]) => {
  if (!value) {
    console.warn(`⚠️ ${key} not found in environment, using fallback`)
    // Use fallback values
    if (key === 'NEXT_PUBLIC_SUPABASE_URL') {
      requiredEnvVars.NEXT_PUBLIC_SUPABASE_URL = 'https://pqcgagpijzghdedxwemi.supabase.co'
    } else {
      requiredEnvVars.NEXT_PUBLIC_SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBxY2dhZ3BpanpnaGRlZHh3ZW1pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ5MTY5NDYsImV4cCI6MjA1MDQ5Mjk0Nn0.qeEdgrHqdMiDgv5OIj043G5tck0MSvHDLYi6BHyuEmE'
    }
  }
})

// 📝 Log the environment we're using (but mask sensitive values)
console.log('🔧 Test Environment:', {
  SUPABASE_URL: requiredEnvVars.NEXT_PUBLIC_SUPABASE_URL,
  USING_PRODUCTION: requiredEnvVars.NEXT_PUBLIC_SUPABASE_URL?.includes('pqcgagpijzghdedxwemi'),
  HAS_ANON_KEY: Boolean(requiredEnvVars.NEXT_PUBLIC_SUPABASE_ANON_KEY),
  KEY_LENGTH: requiredEnvVars.NEXT_PUBLIC_SUPABASE_ANON_KEY?.length || 0 // Debug info
})

export const testEnv = {
  NEXT_PUBLIC_SUPABASE_URL: requiredEnvVars.NEXT_PUBLIC_SUPABASE_URL || '',
  NEXT_PUBLIC_SUPABASE_ANON_KEY: requiredEnvVars.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
} as const

export const isProduction = testEnv.NEXT_PUBLIC_SUPABASE_URL?.includes('pqcgagpijzghdedxwemi') || false