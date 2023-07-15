import { Button } from 'carbon-components-react';
import Link from 'next/link';

import styles from "./rent-mortgage-utilities-support.module.css";

const RentMortgageUtilitiesSupport = () => {
  const title = 'Rent Mortgage Utilities Support';
  return (
    <div>
      <div className={styles.rent_mortgage_utilities_support}>
        <h1>{title}</h1>
        {/* TODO: should be links for screen readers, designed like buttons */}
        <Link href={'https://docs.google.com/forms/d/e/1FAIpQLScN2Dbj9yeorxQQ-drPa9xYerrRmkAfjM3mYz6FleB4MwX-KQ/viewform'}>
          <Button>Online Application</Button>
        </Link>
        <Link href='/pdfs/pcsfa.pdf'>
          <Button kind='secondary'>Print Application</Button>
        </Link>
      </div>
    </div>
  );
};

export default RentMortgageUtilitiesSupport;
