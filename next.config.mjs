import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

const isAuthRoute = (pathname) => {
  return pathname.startsWith('/api/auth') || pathname.startsWith('/api/stripe');
};

export const middleware = (req) => {
  const { pathname } = req.nextUrl;
  
  if (!isAuthRoute(pathname) && !req.cookies.get('next-auth.session-token')) {
    return NextResponse.redirect(new URL('/api/auth/signin', req.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    '/((?!api/auth|_next/static|_next/image|favicon.ico).*)',
  ],
};