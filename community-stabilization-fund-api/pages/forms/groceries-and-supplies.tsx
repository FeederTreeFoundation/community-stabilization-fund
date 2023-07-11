import Head from 'next/head';

import type { NextPage } from 'next';

import { BasicNavigation } from '../../src/components/BasicNavigation';
import { Footer } from '../../src/components/Footer';
import { GroceriesAndSuppliesForm } from '../../src/modules/forms/components/GroceriesAndSuppliesForm';

const GroceriesAndSupplies: NextPage = () => (
  <div>
    <Head>
      <title>Community Stabalization Fund API | Groceries and Supplies</title>
      <meta name='description' content='Community Stabilization Funds API' />
      <link rel='icon' href='/favicon.ico' />
    </Head>
    <BasicNavigation />
    <GroceriesAndSuppliesForm />
    <Footer />
  </div>
);

export default GroceriesAndSupplies;
