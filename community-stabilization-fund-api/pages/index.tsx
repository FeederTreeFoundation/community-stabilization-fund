import type { NextPage } from 'next';

import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  const title = "Welcome to Community Stabilization Fund!";
  return (
    <div>
      <div className={`${styles.bg} mt-8`}>
        <div className={styles.bg_overlay}>
          <h1>{title}</h1>
        </div>
      </div>
    </div>
  );
};

export default Home;
