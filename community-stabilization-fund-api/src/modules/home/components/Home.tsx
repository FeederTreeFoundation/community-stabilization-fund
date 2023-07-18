

import styles from '../styles/Home.module.css';

interface HomeProps {
  title: string;
}

const Home = ({ title }: HomeProps) => (
  <div>
    <div className={`${styles.bg} mt-8`}>
      <div className={styles.bg_overlay}>
        <h1>{title}</h1>
      </div>
    </div>
  </div>
);

export { Home };