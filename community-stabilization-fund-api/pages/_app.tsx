import type { AppProps } from 'next/app';
import { Layout } from '../src/components';

import '../styles/globals.css';
import '../styles/styles.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return <Layout><Component {...pageProps} /></Layout>;
};

export default MyApp;
