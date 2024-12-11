import { NextResponse } from 'next/server';

export function middleware(req) {
  const { cookies } = req;
  const user = cookies.get('user');
  const url = req.nextUrl.clone();

  if (user && url.pathname === '/login') {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (!user && url.pathname !== '/login' && !url.pathname.startsWith('/api')) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|logo.webp|oficina.avif|public|api).*)',
  ],
};
