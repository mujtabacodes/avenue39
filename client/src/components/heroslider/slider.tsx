'use client';

import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { slides } from '@/data';
import Image from 'next/image';
import { TSliderSettings } from '@/types/types';

const settings: TSliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const SimpleSlider: React.FC = () => {
  return (
    <Slider {...settings}>
      {slides.map((slide, index) => (
        <div key={index} className="relative h-96">
          <Image src={slide.image} className="w-full h-full" alt="image" />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white">
            <h3 className="text-2xl mb-4">{slide.text}</h3>
            <a
              href={slide.buttonLink}
              className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-700 transition"
            >
              {slide.buttonText}
            </a>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default SimpleSlider;
