import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const userId = request.cookies.get('userId')?.value;
  const pathname = request.nextUrl.pathname;

  // Public paths that don't require authentication
  const publicPaths = ['/', '/auth/login', '/auth/signup'];
  const isPublicPath = publicPaths.some(path => pathname === path || pathname.startsWith('/api/auth'));

  // If user is not logged in and trying to access protected route
  if (!userId && !isPublicPath) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // If user is logged in and trying to access auth pages, redirect to feed
  if (userId && (pathname === '/auth/login' || pathname === '/auth/signup')) {
    return NextResponse.redirect(new URL('/feed', request.url));
  }

  // Continue with the request
  const response = NextResponse.next();
  
  // Ensure cookie persists on every request if it exists
  if (userId) {
    const isProduction = process.env.NODE_ENV === 'production';
    response.cookies.set('userId', userId, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
