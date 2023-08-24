import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import { useState, useEffect, useCallback } from 'react';

import { useStorage } from '../../hooks';
import { isEmpty } from '../../utils';

interface RouteGuardProps {
  children: any[] | any;
}

function RouteGuard({ children }: RouteGuardProps) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  const { user, error, isLoading } = useUser();
  const { state } = useStorage('api_user', '');

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

  return authorized && children;

  function authCheck(url: string, _opts: any) {
    // redirect to login page if accessing a private page and not logged in
    const apiUserId = state === window.sessionStorage.getItem('api_user') 
      ? state 
      : window.sessionStorage.getItem('api_user');
    const publicPaths = [
      '/',
      '/forms/groceries-and-supplies',
      '/rent-mortgage-utilities-support',
      '/about/pittsburgh-collaborative',
      '/about/community-movement-builders',
      '/about/swope-dreams',
      '/donate',
    ];
    const privatePaths = ['/form-responses', '/checklists'];
    const path = url.split('?')[0];
    const roles = user && getRoles();
    
    if(isEmpty(roles) && !isLoading) {
      setAuthorized(false);
      router.push({
        pathname: '/',
      });
    } else if (!user && !isLoading && !publicPaths.includes(path)) {
      setAuthorized(false);
      router.push({
        pathname: '/api/auth/login',
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

  function getRoles() {
    if(isEmpty(user)) return [];

    for (const key in user) {
      if (key.includes('role') && user[key]) {
        return user[key] as string[];
      }
    }
  }
}

export { RouteGuard };
