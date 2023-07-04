import { Button } from 'carbon-components-react';

import Link from 'next/link';

import BasicNavigation from '../../src/components/BasicNavigation';

import styles from './rent-mortgage-utilities-support.module.css';

const RentMortgageUtilitiesSupport = () => {
  const title = 'Rent Mortgage Utilities Support';
  return (
    <div>
      <BasicNavigation />
      <div className={styles.rent_mortgage_utilities_support}>
        <h1>{title}</h1>

        <a href='https://docs.google.com/forms/d/e/1FAIpQLScN2Dbj9yeorxQQ-drPa9xYerrRmkAfjM3mYz6FleB4MwX-KQ/viewform'>
          <Button>Online Application</Button>
        </a>
        <Link href='/pdfs/pcsfa.pdf'>
          <Button kind='secondary'>Print Application</Button>
        </Link>
      </div>
    </div>
  );
};

export default RentMortgageUtilitiesSupport;
