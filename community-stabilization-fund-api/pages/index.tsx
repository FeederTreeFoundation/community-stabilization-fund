import Head from 'next/head';

import type { NextPage } from 'next';

import { BasicNavigation } from '../src/components';

import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  const title = "Welcome to Community Stabilization Fund!";
  return (
    <div>
      <Head>
        <title>Community Stabalization Fund API | Home</title>
        <meta name='description' content='Community Stabilization Fund' />
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
