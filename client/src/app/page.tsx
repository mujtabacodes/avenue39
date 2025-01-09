
'use client';
import React from 'react';
import DiscountCard from '@/components/ui/discount-card';
import {discountProducts, testimonialcards } from '@/data';
import SofaBanner from '@/components/discount-banner/sofa-banner';
import SaleBanner from '@/components/discount-banner/sale-banner';
import HotProductSlider from '@/components/card-slider/hot-product-slider';
import Testimonial from '@/components/testimonial/testimonial';
import CardsTabes from '@/components/card-tabs/card-slider';
import HeroVideo from '@/components/Home/hero-video';
import WhatsIcon from '@/components/whatsapp';
import CustomPaging from '@/components/image-slider';
import { SliderImages } from '@/data/products';
import { usePathname } from 'next/navigation';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import Catalogue from '@/components/Catalogue/Catalogue';
import ColorBanner from '@/components/ColorBanner/ColorBanner';
import ProductBanner from '@/components/discount-banner/product-banner';



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
      <ColorBanner/>
      <DiscountCard productItems={discountProducts} />
      <SofaBanner />
      <SaleBanner />
      <CardsTabes />
      <div className='bg-transparent slider-container lg:mt-10'>
      <CustomPaging images={transformedSliderImages} setting={customSettings}  
      className="w-full h-full bg-none overflow-hidden border-0 gap-10 space-x-6" 
      sliderBgClass={isHomePage ? 'bg-none' : 'bg-red-300'} 
      imageBgClass={isHomePage ? 'bg-none border-0' : 'bg-violet-600 border-0'}  
      />
      </div>     
      <HotProductSlider />
      <Catalogue/>
      
      {/* <DiscountBanner /> */}
      {testimonialcards && testimonialcards.length > 50 && (
        <Testimonial testimonialitems={testimonialcards} />
      )}
   
    </>
  );
}
