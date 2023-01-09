import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

interface RouteGuardProps {
    children: any[] | any
}


function RouteGuard({ children }: RouteGuardProps) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // on initial load - run auth check
    const apiUserId = localStorage.getItem('api_user') ?? undefined; 
    authCheck(router.asPath, apiUserId);

    // on route change start - hide page content by setting authorized to false  
    const hideContent = () => setAuthorized(false);
    router.events.on('routeChangeStart', hideContent);

    // on route change complete - run auth check 
    router.events.on('routeChangeComplete', authCheck);

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off('routeChangeStart', hideContent);
      router.events.off('routeChangeComplete', authCheck);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function authCheck(url: string, apiUserId?: string) {
    // redirect to login page if accessing a private page and not logged in 
    const publicPaths = ['/admin/login', '/'];
    const path = url.split('?')[0];
    if (!apiUserId && !publicPaths.includes(path)) {
      setAuthorized(false);
      router.push({
        pathname: '/admin/login',
        query: { returnUrl: router.asPath }
      });
    } else {
      setAuthorized(true);
    }
  }

  return (authorized && children);
}

export { RouteGuard };