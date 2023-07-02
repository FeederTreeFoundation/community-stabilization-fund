import {
  Header,
  HeaderNavigation,
  HeaderMenu,
  HeaderMenuItem,
  HeaderName,
  Theme,
} from '@carbon/react';
import { Button } from 'carbon-components-react';

import Link from 'next/link';

import { useState } from 'react';

import styles from './BasicNavigation.module.css';

const BasicNavigation = () => {
  const [menuState, setMenuState] = useState(false);
  const handleClick = () => setMenuState(!menuState);
  return (
    <div>
      <div className={styles.title}>
        <Link href='/'>
          Community Stabilization Fund - Keeping Residents In Place
        </Link>
        <Link href='/'>Black Liberation Programs</Link>
      </div>
      <Theme theme='g100'>
        <Header
          aria-label='CMB Community Stabilization Fund'
          className={`${styles.navbar} ${styles.header_nav}`}
        >
          <HeaderNavigation aria-label='CMB Community Stabilization Fund'>
            <HeaderMenu aria-label='About Us' menuLinkName='About Us'>
              {/* TODO: fix linking to use next link*/}
              {/* <Link href='/about/pittsburgh-collaborative'>
              <HeaderMenuItem>Pittsburgh Collaborative</HeaderMenuItem>
            </Link> */}
              <HeaderMenuItem href='/about/pittsburgh-collaborative'>
                Pittsburgh Collaborative
              </HeaderMenuItem>
              <HeaderMenuItem href='/about/community-movement-builders'>
                Community Movement Builders
              </HeaderMenuItem>
              <HeaderMenuItem href='/about/swope-dreams'>
                Swope Dreams
              </HeaderMenuItem>
            </HeaderMenu>
            <Link href='/rent-mortgage-utilities-support'>
              <HeaderMenuItem>Rent, Mortgage, Utilities Support</HeaderMenuItem>
            </Link>
            <Link href='/donate'>
              <HeaderMenuItem>Donate</HeaderMenuItem>
            </Link>
            <Link href='/forms/groceries-and-supplies'>
              <HeaderMenuItem>Free Groceries And Supplies</HeaderMenuItem>
            </Link>
          </HeaderNavigation>
        </Header>
      </Theme>
    </div>

    // <nav className={styles.basic_nav}>
    //   <div className={styles.title}>
    //     <Link href='/'>
    //       Community Stabilization Fund - Keeping Residents In Place
    //     </Link>
    //     <h2>Black Liberation Programs</h2>
    //   </div>
    //   <div>
    //     <Button
    //       kind='secondary'
    //       className={styles.btn_link}
    //       onClick={handleClick}
    //     >
    //       About Us
    //     </Button>
    //     <nav
    //       className={
    //         menuState
    //           ? `${styles.drop_down} ${styles.drop_down_open}`
    //           : `${styles.drop_down}`
    //       }
    //     >
    //       <Link href='/about/pittsburgh-collaborative'>
    //         Pittsburgh Collaborative
    //       </Link>
    //       <Link href='/about/community-movement-builders'>
    //         Community Movement Builders
    //       </Link>
    //       <Link href='/about/swope-dreams'>Swope Dreams</Link>
    //     </nav>
    //   </div>
    //   <Link href='/rent-mortgage-utilities-support'>
    //     <Button kind='secondary' className={styles.btn_link}>
    //       Rent, Mortgage, Utilities Support
    //     </Button>
    //   </Link>
    //   <Link href='/donate'>
    //     <Button kind='secondary' className={styles.btn_link}>
    //       Donate
    //     </Button>
    //   </Link>
    //   <Link href='/forms/groceries-and-supplies'>
    //     <Button kind='secondary' className={styles.btn_link}>
    //       Free Groceries And Supplies
    //     </Button>
    //   </Link>
    // </nav>
  );
};

export default BasicNavigation;
