import { Button } from 'carbon-components-react';

import BasicLayout from '../../src/components/BasicLayout';
import { Footer } from "../../src/components/Footer";

import styles from './donate.module.css';

const Donate = () => (
  <div className={styles.donate}>
    <BasicLayout>
      <p>
        If you would like to donate to the Pittsburgh Community Stabilization
        Fund, please follow the link below to Community Movement Builders, a
        founding partner non-profit organization for PCSF, and write ‘Pittsburgh
        Community Stabilization Fund’ or ‘PCSF’ in the comments section of the
        donation page and we will earmark those funds for this program.
      </p>
      <a className={styles.btn_link} href='https://communitymovementbuilders.org/donate.html'>
        <Button className={styles.btn_copy} kind='secondary'>
          CLICK HERE TO DONATE FOR PCSF AT COMMUNITY MOVEMENT BUILDERS
        </Button>
      </a>
    </BasicLayout>
    <Footer />
  </div>
);

export default Donate;
