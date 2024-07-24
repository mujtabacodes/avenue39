'use client';

import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// import { bannerImage, slides } from '@/data';
import Image from 'next/image';
import { TSliderSettings } from '@/types/types';
import { Button } from '../ui/button';
import ImageBanner from "../mage-banner";
import { bannerImage, slides } from '@/data';
// import  bannerImage from '@/data';


const settings: TSliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const SimpleSlider: React.FC = () => {
  return (
    <div className='flex justify-end gap-4'>
 
   <div className='overflow-hidden w-[70%] '>
     <Slider {...settings}>
      {slides.map((slide:any, index:any) => (
        <div key={index} className="relative h-full">
          <Image src={slide.image} className="w-full h-full" alt="image" />
          <div className="absolute  lg:left-56 left-10 inset-0 bg-black bg-opacity-5 flex flex-col items-start justify-center text-white">
            <h3 className="text-xl mb-4">{slide.bannerSubHeading}</h3>
            <h2 className="text-6xl mb-4 font-bold w-1/3">{slide.bannerHeading}</h2>
            <Button className='mt-5'
            variant={"link"}              
            >
              {slide.buttonText}
            </Button>
          </div>
        </div>
        
      ))}
    </Slider>
   </div>
   <div className='w-[30%]'>
   <ImageBanner bannerImage={bannerImage} />
   </div>
   </div>
  );
};

export default SimpleSlider;
