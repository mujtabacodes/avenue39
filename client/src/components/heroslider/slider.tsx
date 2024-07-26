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
    <div className='flex flex-wrap lg:flex-nowrap  lg:justify-end justify-center lg:gap-4'>
      <div className='overflow-hidden lg:w-[70%] sliderTabes__dots'>
        <Slider {...settings} className='lg:mb-10'>
          {slides.map((slide: any, index: any) => (
            <div key={index} className="relative h-full">
              <Image src={slide.image} className="w-full lg:h-full h-96 object-cover " alt="image" />
              <div className="absolute lg:left-56 left-10 inset-0 bg-opacity-5 flex flex-col items-start justify-center text-secondary">
                <h3 className="lg:text-xl  mb-4">{slide.bannerSubHeading}</h3>
                <h2 className=" lg:text-6xl md:text-4xl text-2xl mb-4 font-bold md:w-full lg:w-full xl:w-1/2 xxl:w-1/2 text-left">{slide.bannerHeading}</h2>
                <Button className='lg:mt-5' variant={"link"}>
                  {slide.buttonText}
                </Button>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <div className='lg:w-[30%] md:w-full w-full'>
        <ImageBanner bannerImage={bannerImage} />
      </div>
    </div>
    </>
  );
};

export default SimpleSlider;
