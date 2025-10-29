import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { decrypt } from '@/features/jwt/lib/jwt'

// 1. Specify protected and public routes
const protectedRoutes = ['/dashboard', '/dashboard/profile', '/dashboard/settings']
const publicRoutes = ['/auth/login', '/auth/register']
 
export default async function proxy(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path             = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute    = publicRoutes.includes(path)
 
  // 3. Decrypt the session from the cookie
  const cookie  = (await cookies()).get('session')?.value
  const payload = cookie ? await decrypt(cookie) : null
 
  // 4. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !payload?.sessionId) {
    return NextResponse.redirect(new URL('/auth/login', req.nextUrl))
  }
 
  // 5. Redirect to /dashboard if the user is authenticated
  if (
    isPublicRoute &&
    payload?.sessionId &&
    !req.nextUrl.pathname.startsWith('/dashboard')
  ) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
  }

  return NextResponse.next()
}
 
// Routes Proxy should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
