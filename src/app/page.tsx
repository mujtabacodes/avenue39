import React from 'react';
import {testimonialcards } from '@/data';
import SofaBanner from '@/components/discount-banner/sofa-banner';
import Testimonial from '@/components/testimonial/testimonial';
import HeroVideo from '@/components/Home/hero-video';
import WhatsIcon from '@/components/whatsapp';
import Catalogue from '@/components/Catalogue/Catalogue';
import AllCategory from '@/components/CategoryCard/AllCategory';
import NewArrival from '@/components/newarrival';
import ColorBanner from '@/components/ColorBanner/ColorBanner';
import { fetchProducts } from '@/config/fetch';

export default async function Home() {
  const products = await fetchProducts();
  return (
    <>
      <WhatsIcon />
      <HeroVideo />
      <ColorBanner/>
      <SofaBanner />
      <NewArrival/>
      <AllCategory products={products} />
      <Catalogue/>
      {testimonialcards && testimonialcards.length > 50 && (
        <Testimonial testimonialitems={testimonialcards} />
      )}
    </>
  );
}
