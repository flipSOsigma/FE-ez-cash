import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { decodeBase64 } from './app/lib/function';

export function middleware (request: NextRequest) {
  const token = request.cookies.get('token');
  const response = NextResponse.next();

  if (token?.value) {
    const userData = decodeBase64(token.value);
    response.headers.set('x-user-data', userData);
    if (['/', '/signin', '/signup'].includes(request.nextUrl.pathname)) {
      return NextResponse.redirect('http://localhost:3000/home');
    }
  } else {
    if (['/home', '/calendar', '/profile', '/chart', '/history'].includes(request.nextUrl.pathname)) {
      return NextResponse.redirect('http://localhost:3000/');
    }
  }

  return response
}

