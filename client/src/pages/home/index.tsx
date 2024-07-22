import Navbar from '@/components/nav/nav-bar';
import TopNav from '@/components/nav/top-nav';
import { IHome } from '@/types/types';
import React, { Fragment } from 'react';

const HomePage = (props: IHome) => {
  return (
    <Fragment>
      <TopNav />
      <Navbar />
      
      <h1>hdsafasdf</h1>
    </Fragment>
  );
};

export default HomePage;
