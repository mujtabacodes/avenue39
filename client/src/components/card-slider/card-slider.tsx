'use client';
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Card from '../ui/card';
import { IProduct } from '@/types/types';
import CustomNextArrow from './custom-next-arrow';
import CustomPrevArrow from './custom-prev-arrow';

interface SliderProps {
  cards: IProduct[];
  isModel?: boolean;
  cardHeight?: string;
  sliderArrow?: boolean;
}

const sliderSettings = {
  dots: false,
  arrows: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  prevArrow: <CustomPrevArrow />,
  nextArrow: <CustomNextArrow />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const SliderComponent: React.FC<SliderProps> = ({ cards, isModel, cardHeight , sliderArrow }) => {
  return (
    <Slider {...sliderSettings}>
      {cards.map((card) => (
        <div key={card.id}>
          <Card className='w-full' card={card} isModel={isModel} skeletonHeight={`h-[400px] md:h-[250px] lg:h-[400px] ${cardHeight ? cardHeight : 'xl:h-[672px]'}`} />
        </div>
      ))}
    </Slider>
  );
};

export default SliderComponent;
