import React, { useState } from 'react';
import type { AppProps } from 'next/app';

import { UserContext } from '../src/modules/users';
import { Layout } from '../src/components';

import '../styles/globals.css';
import '../styles/styles.scss';

function MyApp({ Component, pageProps }: AppProps) {
  const [apiKey, setApiKey] = useState('');
  const currentUser = {apiKey, setApiKey}
  // console.log({currentUser})

  return (
    <UserContext.Provider value={currentUser}>
      <Layout><Component {...pageProps} /></Layout>
    </UserContext.Provider>
  )
};

export default MyApp;
