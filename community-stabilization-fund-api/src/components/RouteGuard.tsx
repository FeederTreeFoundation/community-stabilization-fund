import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import { useState, useEffect, useCallback } from 'react';

interface RouteGuardProps {
  children: any[] | any;
}

function RouteGuard({ children }: RouteGuardProps) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const { user, isLoading } = useUser();

  const handleAuthCheck = useCallback(authCheck, [router, user, isLoading]);

  useEffect(() => {
    // on initial load - run auth check
    handleAuthCheck(router.asPath, {});

    // on route change start - hide page content by setting authorized to false
    const hideContent = () => setAuthorized(false);
    router.events.on('routeChangeStart', hideContent);

    // on route change complete - run auth check
    router.events.on('routeChangeComplete', handleAuthCheck);

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off('routeChangeStart', hideContent);
      router.events.off('routeChangeComplete', handleAuthCheck);
    };
  }, [handleAuthCheck, router.asPath, router.events]);

  function authCheck(url: string, _opts: any) {
    // redirect to login page if accessing a private page and not logged in
    const apiUserId = localStorage.getItem('api_user');
    const publicPaths = [
      '/',
      '/forms',
      '/forms/groceries-and-supplies',
      '/rent-mortgage-utilities-support',
    ];
    const privatePaths = ['/form-responses', '/checklists'];
    const path = url.split('?')[0];

    // TODO: Use Roles Based Authentication instead
    if (!user && !isLoading && !publicPaths.includes(path)) {
      setAuthorized(false);
      router.push({
        pathname: '/api/auth/login',
      });
    } else if (typeof apiUserId !== 'string' && privatePaths.includes(path)) {
      setAuthorized(false);
      router.push({
        pathname: '/admin/login',
        query: { returnUrl: router.asPath },
      });
    } else {
      setAuthorized(true);
    }
  }

  return authorized && children;
}

export { RouteGuard };
