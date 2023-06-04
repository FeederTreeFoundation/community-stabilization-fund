import { Button } from 'carbon-components-react';
import Link from 'next/link';

import { useState } from 'react';

import styles from './BasicNavigation.module.css';

const BasicNavigation = () => {
  const [menuState, setMenuState] = useState(false);
  const handleClick = () => setMenuState(!menuState);
  return (
    <nav className={styles.basic_nav}>
      <h1>Community Stabilization Fund - Keeping Residents In Place</h1>
      <h2>Black Liberation Programs</h2>

      <div>
        <Button
          kind='secondary'
          className={styles.btn_link}
          onClick={handleClick}
        >
          About Us
        </Button>
        <nav
          className={
            menuState
              ? `${styles.drop_down} ${styles.drop_down_open}`
              : `${styles.drop_down}`
          }
        >
          <Link href='/pittsburgh-collaborative'>Pittsburgh Collaborative</Link>
          <Link href='/community-movement-builders'>
            Community Movement Builders
          </Link>
          <Link href='/swope-dreams'>Swope Dreams</Link>
        </nav>
      </div>

      <Link href='/rent-mortgage-utilities-support'>
        <Button kind='secondary' className={styles.btn_link}>
          Rent, Mortgage, Utilities Support
        </Button>
      </Link>
      <Link href='/donate'>
        <Button kind='secondary' className={styles.btn_link}>
          Donate
        </Button>
      </Link>
      <Link href='/forms/groceries-and-supplies'>
        <Button kind='secondary' className={styles.btn_link}>
          Free Groceries And Supplies
        </Button>
      </Link>
    </nav>
  );
};

export default BasicNavigation;
