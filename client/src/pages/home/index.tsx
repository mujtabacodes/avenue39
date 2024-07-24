import MenuBar from '@/components/nav/menu-bar';
import Navbar from '@/components/nav/nav-bar';
import TopNav from '@/components/nav/top-nav';
import Services from '@/components/services/services';
import { IHome } from '@/types/types';
import React, { Fragment } from 'react';
import SimpleSlider from '@/components/heroslider/slider';
import CardsTabes from '../card-slider/card-slider';
// import HeroSlier from '../heroslider/page';
import DiscountCard from '@/components/ui/discount-card';

const HomePage = (props: IHome) => {
  return (
    <Fragment>
      <TopNav />
      <Navbar />
      <MenuBar/>
      <SimpleSlider />
      <Services />
      <CardsTabes />

      <section className='px-4 pb-2 my-4 overflow-x-auto discount-product-wrapper'>
        <DiscountCard />
      </section>

    </Fragment>
  );
};

export default HomePage;
