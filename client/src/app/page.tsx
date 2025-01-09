
'use client';
import React from 'react';
import {testimonialcards } from '@/data';
import SofaBanner from '@/components/discount-banner/sofa-banner';
import Testimonial from '@/components/testimonial/testimonial';
import HeroVideo from '@/components/Home/hero-video';
import WhatsIcon from '@/components/whatsapp';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Catalogue from '@/components/Catalogue/Catalogue';
import AllCategory from '@/components/CategoryCard/AllCategory';
import NewArrival from '@/components/newarrival';



export default function Home() {
  return (
    <>
      <WhatsIcon />
      <HeroVideo />
      <SofaBanner />
      <NewArrival/>
     <AllCategory/>
      <Catalogue/>
      {testimonialcards && testimonialcards.length > 50 && (
        <Testimonial testimonialitems={testimonialcards} />
      )}
    </>
  );
}
