import { UserProvider } from '@auth0/nextjs-auth0';
import React from 'react';

import { Layout, RouteGuard } from '../src/components';

import type { AppProps } from 'next/app';

import '../styles/globals.css';
import '../styles/styles.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <RouteGuard>
        <Layout><Component {...pageProps} /></Layout>
      </RouteGuard>
    </UserProvider>
  );
}

export default MyApp;
