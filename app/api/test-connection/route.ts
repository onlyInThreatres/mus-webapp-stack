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
    // 🔍 Validate environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    // 📝 Debug logging (safe - no sensitive data)
    console.log('🔧 Environment check:', {
      timestamp: new Date().toISOString(),
      hasUrl: Boolean(supabaseUrl),
      hasKey: Boolean(supabaseKey),
      urlLength: supabaseUrl?.length || 0,
      keyLength: supabaseKey?.length || 0
    })

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({
        error: 'Configuration error',
        details: 'Missing required environment variables',
        missingVars: {
          url: !supabaseUrl,
          key: !supabaseKey
        }
      }, { status: 500 })
    }

    // 🔗 Create Supabase client
    const supabase = createClient(supabaseUrl, supabaseKey)

    // 🧪 Simple health check
    const { data, error } = await supabase.auth.getSession()

    if (error) {
      console.error('🔴 Supabase error:', {
        code: error.code,
        message: error.message,
        status: error.status
      })
      throw error
    }

    // ✅ Success response
    return NextResponse.json({ 
      success: true, 
      message: 'Connection successful',
      timestamp: new Date().toISOString(),
      sessionData: data ? 'Present' : 'None'
    })

  } catch (error) {
    console.error('🔴 Connection test failed:', error)
    return NextResponse.json({ 
      error: 'Connection test failed', 
      details: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
} 