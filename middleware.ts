import { NextRequest, NextResponse } from 'next/server'

import { Role } from '@/app/generated/prisma'
import { verifySession } from './app/auth/dal/auth-dal'

export const config = {
  matcher: [
    '/auth/:path*',
    '/dashboard/:path*',
    '/admin/:path*',
  ],
}

export default async function middleware(req: NextRequest) {
  const path    = req.nextUrl.pathname
  const session = await verifySession()

  if (path.startsWith('/auth') && session?.id) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
  }
  
  if (path.startsWith('/dashboard') && !session?.id) {
    return NextResponse.redirect(new URL('/auth/login', req.nextUrl))
  }

  if (path.startsWith('/admin') && session?.user?.role !== Role.ADMIN) {
    return NextResponse.redirect(new URL('/', req.nextUrl))
  }

  return NextResponse.next()
}
