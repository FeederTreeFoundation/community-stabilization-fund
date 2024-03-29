import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import { useState, useEffect, useCallback } from 'react';

import { useStorage } from '../../hooks';
import { getRoles, isEmpty } from '../../utils';

interface RouteGuardProps {
  children: any[] | any;
}

function RouteGuard({ children }: RouteGuardProps) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  const { user, error, isLoading } = useUser();
  const { state } = useStorage('api_user_id', '');

  if(error) {
    console.error(error);
    alert(error);
  }

  const handleAuthCheck = useCallback(authCheck, [router, user, isLoading, state]);

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
    const apiUserId = state === window.sessionStorage.getItem('api_user_id') 
      ? state 
      : window.sessionStorage.getItem('api_user_id');
    const publicPaths = [
      '/',
      '/forms/groceries-and-supplies',
      '/rent-mortgage-utilities-support',
      '/about/pittsburgh-collaborative',
      '/about/community-movement-builders',
      '/about/swope-dreams',
      '/donate',
    ];
    const privatePaths = ['/form-responses', '/checklists', '/organizations'];
    const path = url.split('?')[0];
    const roles = getRoles(user);
    
    if (!user && !isLoading && !publicPaths.includes(path)) {
      setAuthorized(false);
      router.push({
        pathname: '/api/auth/login',
      });
    } else if(isEmpty(roles) && !isLoading && !publicPaths.includes(path)) {
      setAuthorized(false);
      router.push({
        pathname: '/',
      });
    } else if (isEmpty(apiUserId) && privatePaths.includes(path)) {
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
