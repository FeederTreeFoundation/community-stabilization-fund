import type { NextPage } from 'next';

import { Home } from "../src/modules/home";

const HomePage: NextPage = () => {
  const title = "Welcome to Community Stabilization Fund!";
  return <Home title={title} />; 
};

export default HomePage;
