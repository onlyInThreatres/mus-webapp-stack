import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Define public routes that don't require authentication
const publicRoutes = ['/', '/login', '/signup', '/forgot-password']

export async function middleware(request: NextRequest) {
  try {
    // Initialize response and Supabase client
    const res = NextResponse.next()
    const supabase = createMiddlewareClient({ req: request, res })

    // Get current pathname
    const { pathname } = request.nextUrl
    console.log(`[Middleware] Checking route: ${pathname}`)

    // Check if the route is public
    const isPublicRoute = publicRoutes.includes(pathname)
    console.log(`[Middleware] Is public route: ${isPublicRoute}`)

    // Get session
    const { data: { session } } = await supabase.auth.getSession()
    console.log(`[Middleware] Session exists: ${!!session}`)

    // TODO: Implement redirect logic based on your requirements
    // Example structure:
    // if (!session && !isPublicRoute) {
    //   console.log('[Middleware] Unauthorized access, redirecting to login')
    //   return NextResponse.redirect(new URL('/login', request.url))
    // }
    
    // if (session && pathname === '/login') {
    //   console.log('[Middleware] Logged in user accessing login page, redirecting to dashboard')
    //   return NextResponse.redirect(new URL('/dashboard', request.url))
    // }

    return res
  } catch (error) {
    console.error('[Middleware] Error:', error)
    // On error, allow the request to continue
    return NextResponse.next()
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}