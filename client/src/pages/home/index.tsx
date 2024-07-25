import MenuBar from '@/components/nav/menu-bar';
import Navbar from '@/components/nav/nav-bar';
import TopNav from '@/components/nav/top-nav';
import Services from '@/components/services/services';
import { IHome } from '@/types/types';
import React, { Fragment } from 'react';
import SimpleSlider from '@/components/heroslider/slider';
import CardsTabes from '../card-slider/card-slider';
import BottomBar from '@/components/nav/bottom-bar';

const HomePage = (props: IHome) => {
  return (
    <Fragment>
      <TopNav />
      <Navbar />
      <MenuBar/>
      <BottomBar/>
      
      <SimpleSlider />
      <Services />
      <CardsTabes />


    </Fragment>
  );
};

export default HomePage;
