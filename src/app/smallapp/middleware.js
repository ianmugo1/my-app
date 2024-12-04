import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // Define paths that require authentication
  const protectedPaths = ['/smallapp/customer', '/smallapp/manager'];

  if (protectedPaths.some((path) => pathname.startsWith(path))) {
    if (!token) {
      const url = new URL('/api/auth/signin', req.url);
      url.searchParams.set('callbackUrl', req.url); // Redirect back after login
      return NextResponse.redirect(url);
    }

    // Optional: Check user roles for authorization
    if (pathname.startsWith('/smallapp/manager') && token.acc_type !== 'manager') {
      return NextResponse.redirect(new URL('/smallapp', req.url)); // Redirect unauthorized users
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/smallapp/customer/:path*', '/smallapp/manager/:path*'],
};