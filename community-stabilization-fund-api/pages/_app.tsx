import { UserProvider } from '@auth0/nextjs-auth0';
import React from 'react';

import { Layout } from '../src/components';

import type { AppProps } from 'next/app';

import '../styles/globals.css';
import '../styles/styles.scss';

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <UserProvider>
      <Layout><Component {...pageProps} /></Layout>
    </UserProvider>
  );
};

export default MyApp;
