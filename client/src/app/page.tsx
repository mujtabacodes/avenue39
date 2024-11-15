import Services from '@/components/services/services';
import React from 'react';
import SimpleSlider from '@/components/heroslider/slider';
import DiscountCard from '@/components/ui/discount-card';
import { chairProducts, discountProducts, testimonialcards } from '@/data';
import SofaBanner from '@/components/discount-banner/sofa-banner';
import SaleBanner from '@/components/discount-banner/sale-banner';
import Container from '@/components/ui/Container';
import HotProductSlider from '@/components/card-slider/hot-product-slider';
import Testimonial from '@/components/testimonial/testimonial';
import CardsTabes from '@/components/card-tabs/card-slider';
import TimerSlider from '@/components/timer-slider/TimerSlider';
import Link from 'next/link';
import Image from 'next/image';
import DiscountBanner from '@/components/Home/discount-banner';
import HeroVideo from '@/components/Home/hero-video';
import WhatsIcon from '@/components/whatsapp';
export default function Home() {
  return (
    <>
      <WhatsIcon />
      <HeroVideo />
      {/* <SimpleSlider />
      <Services /> */}
      <DiscountCard productItems={discountProducts} />
      <SofaBanner />
      <SaleBanner />
      <CardsTabes />
      <TimerSlider />
      <HotProductSlider />
      <DiscountBanner />
      {testimonialcards && testimonialcards.length > 50 && (
        <Testimonial testimonialitems={testimonialcards} />
      )}
    </>
  );
}
