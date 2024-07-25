'use client';
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';
import { Button } from '../ui/button';
import ImageBanner from "../mage-banner";
import { bannerImage, slides } from '@/data';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
 
};

const SimpleSlider: React.FC = () => {
  return (
    <>
    <div className='flex flex-wrap lg:flex-nowrap  justify-end gap-4'>
      <div className='overflow-hidden lg:w-8/12'>
        <Slider {...settings} className='mb-10'>
          {slides.map((slide: any, index: any) => (
            <div key={index} className="relative h-full">
              <Image src={slide.image} className="w-full h-auto" alt="image" />
              <div className="absolute lg:left-56 left-10 inset-0 bg-opacity-5 flex flex-col items-start justify-center text-secondary">
                <h3 className="lg:text-xl  mb-4">{slide.bannerSubHeading}</h3>
                <h2 className=" lg:text-6xl text-2xl mb-4 font-bold lg:w-1/3">{slide.bannerHeading}</h2>
                <Button className='lg:mt-5' variant={"link"}>
                  {slide.buttonText}
                </Button>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <div className='lg:w-[30%]'>
        <ImageBanner bannerImage={bannerImage} />
      </div>
    </div>
    </>
  );
};

export default SimpleSlider;
