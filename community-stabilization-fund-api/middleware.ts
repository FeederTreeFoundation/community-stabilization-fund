import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';

const isAuthRoute = (pathname: string) =>
  pathname.startsWith('/api/auth') ||
  pathname.startsWith('/api/users/authenticate');

export async function middleware(req: NextRequest) {
  const { headers, cookies, nextUrl, url } = req;

  const token = headers.get('authorization');
  // // TODO: create api Key that expires in 24 hours
  // const isLoggedIn = cookies.get('appSession');
  // const { pathname } = nextUrl;
  // console.log({ token, pathname }, !!isLoggedIn, isAuthRoute(pathname));

  // if(!isLoggedIn && !isAuthRoute(pathname)) {
  //   console.log(1);
    
  //   return NextResponse.redirect('/api/auth/login');
  // };

  // if (!token && !isAuthRoute(pathname) ) {
  //   console.log(2);
    
  //   // TODO: Redirect to error page if no token
  //   const newUrl = nextUrl.clone();
  //   newUrl.pathname = `/api/errors/401`;
  //   return NextResponse.redirect(newUrl);
  // }

  // if (!token && !isAuthRoute(pathname)) {
  //   return NextResponse.redirect('/admin/login');
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*'],
};
