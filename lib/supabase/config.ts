// 📝 Configuration validation for Supabase
const requiredEnvVars = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL,
  anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
}

// Check all required variables
Object.entries(requiredEnvVars).forEach(([name, value]) => {
  if (!value) {
    throw new Error(`🔴 Missing required environment variable: ${name}`)
  }
})

// Export validated config
export const supabaseConfig = {
  url: requiredEnvVars.url,
  anonKey: requiredEnvVars.anonKey
} as const

// Add some helper functions
export function getSupabaseStatus() {
  return {
    isConfigured: !!(supabaseConfig.url && supabaseConfig.anonKey),
    projectUrl: supabaseConfig.url
  }
} 