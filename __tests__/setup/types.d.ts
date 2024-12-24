declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_SUPABASE_URL: string
    NEXT_PUBLIC_SUPABASE_ANON_KEY: string
    TEST_MODE?: 'remote' | 'local' | 'ci'
  }
}

declare module '@supabase/supabase-js' {
  export const createClient: any
  export type SupabaseClient = any
} 