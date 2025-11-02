import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

import { Role } from '@/app/generated/prisma'
import { decrypt } from '@/features/jwt'

export const config = {
  matcher: [
    '/auth/:path*',
    '/dashboard/:path*',
    '/admin/:path*'
  ],
}

export default async function middleware(req: NextRequest) {
  const path    = req.nextUrl.pathname
  const cookie  = (await cookies()).get('session')?.value
  const payload = cookie ? await decrypt(cookie) : null

  if (path.startsWith('/dashboard') && !payload?.sessionId) {
    return NextResponse.redirect(new URL('/auth/login', req.nextUrl))
  }

  if (
    path.startsWith('/auth') &&
    payload?.sessionId &&
    !path.startsWith('/dashboard')
  ) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
  }

  if (
    path.startsWith('/admin') &&
    payload?.role !== Role.ADMIN
  ) {
    return NextResponse.redirect(new URL('/', req.nextUrl))
  }

  return NextResponse.next()
}
