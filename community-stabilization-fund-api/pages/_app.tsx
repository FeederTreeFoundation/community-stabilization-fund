import React from 'react';
import type { AppProps } from 'next/app';
import { UserProvider } from '@auth0/nextjs-auth0';
import { Layout } from '../src/components';

import '../styles/globals.css';
import '../styles/styles.scss';

function MyApp({ Component, pageProps }: AppProps) {

  return (
      <UserProvider>
        <Layout><Component {...pageProps} /></Layout>
      </UserProvider>
  )
};

export default MyApp;
