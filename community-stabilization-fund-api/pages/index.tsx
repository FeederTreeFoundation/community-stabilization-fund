import Head from 'next/head';

import BasicNavigation from '../src/components/BasicNavigation';

import type { NextPage } from 'next';

import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  const title = "Welcome to Community Stabilization Fund's API!";
  return (
    <div>
      <Head>
        <title>Community Stabalization Fund API | Home</title>
        <meta name='description' content='Community Stabilization Funds API' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className={styles.bg}>
        <div className={styles.bg_overlay}>
          <BasicNavigation />
          <h1>{title}</h1>
        </div>
      </div>
    </div>
  );
};

export default Home;
