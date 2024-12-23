// 🔧 Test environment configuration
const testEnv = {
  NEXT_PUBLIC_SUPABASE_URL: process.env.TEST_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.TEST_SUPABASE_ANON_KEY,
  NODE_ENV: process.env.NODE_ENV || 'test',
}

// 🚀 Environment helpers
const isProduction = process.env.NODE_ENV === 'production'
const isTest = process.env.NODE_ENV === 'test'

module.exports = {
  testEnv,
  isProduction,
  isTest,
} 