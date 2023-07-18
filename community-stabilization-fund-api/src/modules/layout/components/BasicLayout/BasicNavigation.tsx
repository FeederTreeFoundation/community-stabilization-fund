import {
  Header,
  HeaderNavigation,
  HeaderMenu,
  HeaderMenuItem,
  Theme,
} from '@carbon/react';

import Link from 'next/link';

import styles from '../../styles/BasicNavigation.module.css';

const BasicNavigation = () => (
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
        className={styles.header_nav}
        id={styles.navbar}
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
);

export { BasicNavigation };
