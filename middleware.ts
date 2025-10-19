import { auth } from '@/auth';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const session = await auth();
  const { pathname } = request.nextUrl;

  // Public routes
  if (pathname === '/login' || pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  // Require authentication for protected routes
  if (!session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Admin route protection
  if (pathname.startsWith('/admin') && session.user?.role !== 'admin') {
    return NextResponse.redirect(new URL('/feedback', request.url));
  }

  // User route protection
  if (pathname.startsWith('/feedback') && session.user?.role !== 'user') {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
