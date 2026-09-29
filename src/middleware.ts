import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const UNLOCK_PARAM = 'unlock';
const UNLOCK_KEY = 'em-dev-2026';
const COOKIE_NAME = 'site_unlock';
const ONE_YEAR = 60 * 60 * 24 * 365;

export function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;

  if (searchParams.get(UNLOCK_PARAM) === UNLOCK_KEY) {
    const res = NextResponse.next();
    res.cookies.set(COOKIE_NAME, UNLOCK_KEY, { maxAge: ONE_YEAR, path: '/', httpOnly: true });
    return res;
  }

  if (req.cookies.get(COOKIE_NAME)?.value === UNLOCK_KEY) {
    return NextResponse.next();
  }

  if (
    pathname === '/locked' ||
    pathname.startsWith('/_next') ||
    pathname === '/favicon.ico' ||
    pathname === '/logo.png' ||
    pathname === '/logo-dark.png' ||
    pathname === '/icon.png' ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml' ||
    pathname === '/manifest.json'
  ) {
    return NextResponse.next();
  }

  const url = req.nextUrl.clone();
  url.pathname = '/locked';
  url.search = '';
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image).*)'],
};
