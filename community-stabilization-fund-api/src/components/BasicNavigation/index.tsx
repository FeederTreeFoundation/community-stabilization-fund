import { Button } from 'carbon-components-react';
import Link from 'next/link';

import styles from './BasicNavigation.module.css';

const BasicNavigation = () => (
  <nav className={styles.basic_nav}>
    <Link href='/rent-mortgage-utilities-support'>
      <Button kind='secondary' className={styles.btn_link}>
        Rent, Mortgage, Utilities Support
      </Button>
    </Link>
  </nav>
);

export default BasicNavigation;
