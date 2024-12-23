/**
 * API Route: Test Supabase Connection
 * 
 * Endpoint to verify Supabase connectivity and configuration
 * @route GET /api/test-connection
 */

import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // 🔍 Log environment variables (masked for security)
    console.log('🔧 Environment check:', {
      HAS_URL: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
      HAS_KEY: Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
      URL_LENGTH: process.env.NEXT_PUBLIC_SUPABASE_URL?.length || 0,
      KEY_LENGTH: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.length || 0
    })

    // Validate environment variables
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      throw new Error('supabasekey is required')
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )

    // Test the connection
    const { data, error } = await supabase.auth.getSession()

    if (error) throw error

    return NextResponse.json({ 
      success: true, 
      message: 'Connection successful',
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('🔴 Connection test failed:', error)
    return NextResponse.json({ 
      error: 'Connection test failed', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 