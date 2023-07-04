import Head from 'next/head';

import { BasicNavigation } from '../../src/components';
import { GroceriesAndSuppliesForm } from '../../src/modules/forms/';

import type { NextPage } from 'next';

const GroceriesAndSupplies: NextPage = () => (
  <div>
    <Head>
      <title>Community Stabalization Fund API | Groceries and Supplies</title>
      <meta name='description' content='Community Stabilization Funds API' />
      <link rel='icon' href='/favicon.ico' />
    </Head>
    <BasicNavigation />
    <GroceriesAndSuppliesForm />
  </div>
);

export default GroceriesAndSupplies;
