import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';

const isAuthRoute = (pathname: string) =>
  pathname.startsWith('/api/auth') ||
  pathname.startsWith('/api/users/authenticate');

export async function middleware(req: NextRequest) {
  const { headers, cookies, nextUrl, url } = req;

  const token = headers.get('authorization');
  // TODO: create api Key that expires in 24 hours
  const isLoggedIn = cookies.get('appSession');
  const { pathname } = nextUrl;
  console.log({ token, pathname });

  if (isAuthRoute(pathname)) {
    return NextResponse.next();
  }

  if (!token) {
    // TODO: Redirect to error page if no token
    const newUrl = nextUrl.clone();
    newUrl.pathname = `/api/errors/401`;
    return NextResponse.redirect(newUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*'],
};
