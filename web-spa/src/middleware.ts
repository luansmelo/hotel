import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const at = request.cookies.get('at')

  if (!at) {
    if (request.nextUrl.pathname.startsWith('/kitchen')) {
      return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next()
  }

  if (at) {
    if (request.nextUrl.pathname === '/') {
      return NextResponse.redirect(new URL('/kitchen', request.url))
    }
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/:path*',
}
