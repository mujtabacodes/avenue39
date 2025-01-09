
'use client';
import React from 'react';
import {testimonialcards } from '@/data';
import SofaBanner from '@/components/discount-banner/sofa-banner';
import Testimonial from '@/components/testimonial/testimonial';
import HeroVideo from '@/components/Home/hero-video';
import WhatsIcon from '@/components/whatsapp';
import { SliderImages } from '@/data/products';
import { usePathname } from 'next/navigation';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import Catalogue from '@/components/Catalogue/Catalogue';
import ColorBanner from '@/components/ColorBanner/ColorBanner';
import NewArrival from '@/components/newarrival';

export default function Home() {
  const transformedSliderImages = SliderImages.map((image) => ({
    imageUrl: image.src,  
    src: image.src,
    alt: image.alt,
    link: image.link
  }));
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const customSettings = {
    slidesToShow: 3,  
    slidesToScroll: 1,
    dots: false,  
    infinite: false,
    arrows: transformedSliderImages.length > 3 ? true : false,
    prevArrow: (
      <button className="custom-prev-arrow">
        <span><BsArrowLeft /></span>
      </button>
    ),
    nextArrow: (
      <button className="custom-next-arrow">
        <span><BsArrowRight /></span>
      </button>
    ),
    
  };

  return (
    <>
      <WhatsIcon />
      <HeroVideo />
      <SofaBanner />
      <NewArrival/>
      <Catalogue/>
      <ColorBanner/>
      {/* <DiscountBanner /> */}
      {testimonialcards && testimonialcards.length > 50 && (
        <Testimonial testimonialitems={testimonialcards} />
      )}
    </>
  );
}
