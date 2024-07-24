import MenuBar from '@/components/nav/menu-bar';
import Navbar from '@/components/nav/nav-bar';
import TopNav from '@/components/nav/top-nav';
import Services from '@/components/services/services';
import { IHome } from '@/types/types';
import React, { Fragment } from 'react';
import HeroSlier from '../heroslider/page';

const HomePage = (props: IHome) => {
  return (
    <Fragment>
      <TopNav />
      <Navbar />
      <MenuBar/>
    <HeroSlier />

     
      <Services />

    </Fragment>
  );
};

export default HomePage;
