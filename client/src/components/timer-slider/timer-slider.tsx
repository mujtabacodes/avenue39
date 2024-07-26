'use client';
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';
import { Button } from '../ui/button';
import { TimerSliderData } from '@/data';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const TimerSlider: React.FC = () => {
  return (
    <>
      <div className="flex flex-wrap lg:flex-nowrap  lg:justify-end justify-center lg:gap-4">
        <div className="overflow-hidden lg:w-full sliderTabes__dots">
          <Slider {...settings} className="lg:mb-10">
            {TimerSliderData.map((slide: any, index: any) => (
              <div className="bg-[#E3E4E6] lg:h-screen" key={index}>
                <div className="relative flex lg:flex-row flex-col justify-between h-full items-center lg:py-0 py-10">
                  <div className=" w-full lg:px-28 px-20 text-left lg:flex lg:flex-col text-primary lg:order-1 order-2 lg:pt-0 pt-10">
                    <h3 className="lg:text-sm  ">{slide.discountText}</h3>
                    <h3 className="lg:text-6xl text-2xl lg:font-bold  mb-6 text-[#FF0000]">{slide.dealText}</h3>
                    <h3 className="lg:text-5xl text-2xl lg:font-bold  lg:mt-10 mt-6">{slide.price}</h3>
                    <h3 className="lg:text-4xl text-xl lg:mb-10 mb-5 mt-2">{slide.productName}</h3>
                    <h2 className=" lg:text-6xl md:text-4xl text-2xl mb-4 font-bold md:w-full lg:w-full xl:w-1/2 xxl:w-1/2 text-left">
                      {slide.bannerHeading}
                    </h2>
                    <Button className="w-fit lg:px-12" variant={'link'}>
                      {slide.buttonText}
                    </Button>
                  </div>
                 <div className='w-full lg:order-2 order-1'>
                 <Image 
                    src={slide.imageUrl}
                    className=" object-cover "
                    alt="image"
                  />
                 </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
};

export default TimerSlider;
