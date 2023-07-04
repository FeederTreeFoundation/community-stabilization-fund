import { Button } from 'carbon-components-react';

import BasicLayout from '../../src/components/BasicLayout';

import styles from './donate.module.css';
const Donate = () => (
  <BasicLayout>
    <div className={styles.donate}>
      <p>
        If you would like to donate to the Pittsburgh Community Stabilization
        Fund, please follow the link below to Community Movement Builders, a
        founding partner non-profit organization for PCSF, and write ‘Pittsburgh
        Community Stabilization Fund’ or ‘PCSF’ in the comments section of the
        donation page and we will earmark those funds for this program.
      </p>
      <a href='https://communitymovementbuilders.org/donate/'>
        <Button kind='secondary' className={styles.btn_link}>
          CLICK HERE TO DONATE FOR PCSF AT COMMUNITY MOVEMENT BUILDERS
        </Button>
      </a>
    </div>
  </BasicLayout>
);

export default Donate;
