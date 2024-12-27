import { testEnv } from '../__tests__/setup/env'

console.log('🔍 Environment Check:')
console.log('Mode:', testEnv.TEST_MODE)
console.log('Database URL:', testEnv.NEXT_PUBLIC_SUPABASE_URL ? '✅ Set' : '❌ Missing')
console.log('Anon Key:', testEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Missing')

// Try a test connection
const checkConnection = async () => {
  try {
    const response = await fetch(`${testEnv.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/`)
    console.log('Connection Test:', response.status === 200 ? '🟢 Success' : '🔴 Failed')
  } catch (err) {
    console.error('Connection Error:', err)
  }
}

checkConnection() 