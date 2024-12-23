/**
 * API Route: Test Supabase Connection
 * 
 * Endpoint to verify Supabase connectivity and configuration
 * @route GET /api/test-connection
 */

import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET() {
  try {
    console.log('🔍 Starting connection test...')
    
    // Create a fresh client for testing
    const testClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        auth: {
          persistSession: false
        }
      }
    )

    // Try the simplest possible query - just check auth config
    const { data: { session }, error: authError } = await testClient.auth.getSession()

    if (authError) {
      console.error('🔴 Supabase auth error:', authError)
      return NextResponse.json({
        error: 'Auth check failed',
        details: authError.message
      }, { status: 500 })
    }

    return NextResponse.json({
      message: '🟢 Connection successful!',
      status: 'connected',
      hasSession: !!session
    }, { status: 200 })

  } catch (err) {
    console.error('🔴 Unexpected error:', err)
    return NextResponse.json({
      error: 'Connection test failed',
      details: err instanceof Error ? err.message : 'Unknown error'
    }, { status: 500 })
  }
} 