import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { applySecurityHeaders, handleCORS } from '@/lib/security-headers';
import { rateLimit } from '@/lib/rate-limit';

/**
 * Next.js Proxy - Applied to all routes
 * Handles: Security headers, CORS, rate limiting, protected routes
 */
export default async function proxy(request: NextRequest) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  const response = NextResponse.next();

  // Apply security headers to all responses
  applySecurityHeaders(request, response);

  // Handle CORS for API routes
  if (pathname.startsWith('/api/')) {
    handleCORS(request, response);

    // Rate limiting for API routes
    if (pathname.startsWith('/api/auth/')) {
      const limit = rateLimit(request, 'AUTH');
      if (limit.limited) return limit.response;
    } else if (pathname.startsWith('/api/payment/')) {
      const limit = rateLimit(request, 'PAYMENT');
      if (limit.limited) return limit.response;
    } else {
      const limit = rateLimit(request, 'API');
      if (limit.limited) return limit.response;
    }
  }

  // Protected routes - Admin panel
  if (pathname.startsWith('/admin')) {
    // Check for authentication token
    const token = request.cookies.get('accessToken')?.value ||
                  request.headers.get('authorization')?.split(' ')[1];

    if (!token) {
      // Redirect to login if not authenticated
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Protected routes - User dashboard
  if (pathname.startsWith('/dashboard')) {
    const token = request.cookies.get('accessToken')?.value ||
                  request.headers.get('authorization')?.split(' ')[1];

    if (!token) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Redirect authenticated users away from auth pages
  if (['/login', '/register', '/forgot-password', '/verify-otp'].includes(pathname)) {
    const token = request.cookies.get('accessToken')?.value;

    if (token) {
      // Check if it's a redirect after login
      const redirect = request.nextUrl.searchParams.get('redirect');
      if (redirect) {
        return NextResponse.redirect(new URL(redirect, request.url));
      }
      // Default redirect to dashboard
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  return response;
}

/**
 * Configure which routes use this middleware
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\..*|api/health).*)',
    '/api/:path*',
  ],
};
