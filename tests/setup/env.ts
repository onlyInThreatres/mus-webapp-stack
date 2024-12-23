// 🔧 Test environment configuration
type EnvVars = {
  NEXT_PUBLIC_SUPABASE_URL: string | undefined;
  NEXT_PUBLIC_SUPABASE_ANON_KEY: string | undefined;
}

// 🌍 Environment variables for testing
const testEnv = {
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
} as EnvVars

// 🚦 Environment mode check
const isProduction = process.env.NODE_ENV === 'production'

// 📤 Export using CommonJS for Jest compatibility
module.exports = {
  testEnv,
  isProduction,
}