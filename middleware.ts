import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

/**
 * Middleware to handle authentication routes
 * - Uses Supabase for email/password routes (/auth/*)
 * - Uses Auth.js for OAuth routes (/api/auth/*)
 */
export async function middleware(request: NextRequest) {
  try {
    const res = NextResponse.next()
    const { pathname } = request.nextUrl

    // Determine which auth system to check based on route
    if (pathname.startsWith('/auth/')) {
      // 📧 Supabase Email/Password Routes
      const supabase = createMiddlewareClient({ req: request, res })
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session && pathname.startsWith('/auth/protected')) {
        console.log('🔒 Unauthorized access to Supabase protected route:', pathname)
        return NextResponse.redirect(new URL('/auth/login', request.url))
      }
    } 
    else if (pathname.startsWith('/oauth/')) {
      // 🔑 Auth.js OAuth Routes
      const token = await getToken({ req: request })
      
      if (!token && pathname.startsWith('/oauth/protected')) {
        console.log('🔒 Unauthorized access to OAuth protected route:', pathname)
        return NextResponse.redirect(new URL('/oauth/login', request.url))
      }
    }

    return res
  } catch (error) {
    console.error('🚨 Middleware error:', error)
    return NextResponse.next()
  }
}

export const config = {
  matcher: [
    '/auth/:path*',   // Supabase email/password routes
    '/oauth/:path*',  // Auth.js OAuth routes
  ],
}