'use client';
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Card from '../ui/card';
import { IProduct } from '@/types/types';
import CustomNextArrow from './custom-next-arrow';
import CustomPrevArrow from './custom-prev-arrow';
import CardSkeleton from '../cardSkelton';
import { ImNotification } from 'react-icons/im';
import NoProduct from '../ui/no-product';

interface SliderProps {
  cards?: IProduct[];
  isModel?: boolean;
  cardHeight?: string;
  sliderArrow?: boolean;
  silderName?: string;
  isLoading?: boolean;
}

const SliderComponent: React.FC<SliderProps> = ({
  cards,
  isModel,
  cardHeight,
  sliderArrow,
  silderName,
  isLoading,
}) => {
  const sliderSettings = {
    dots: !sliderArrow ? true : false,
    arrows: sliderArrow ? true : false,
    className: cards && cards.length > 1 && silderName ? silderName : '',
    infinite: true,
    speed: 500,
    slidesToShow: cards && cards.length > 3 ? 3 : cards?.length,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: cards && cards.length > 3 ? 3 : cards?.length,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: cards && cards.length > 2 ? 2 : cards?.length,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: cards && cards.length > 1 ? 1 : cards?.length,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      { cards && cards.length > 0 ? <Slider {...sliderSettings}>
        {!isLoading
          ? cards?.map((card) => (
              <div key={card.id}>
                <Card
                  isLoading={isLoading}
                  className="w-full"
                  card={card}
                  isModel={isModel}
                  skeletonHeight={`h-[400px] md:h-[250px] lg:h-[400px] ${cardHeight ? cardHeight : 'xl:h-[672px]'}`}
                />
              </div>
            ))
          : [...Array(3)].map((_, index) => (
              <span key={index} className="">
                <Card
                  isLoading={isLoading}
                  className="w-full"
                  isModel={isModel}
                  skeletonHeight={`h-[400px] md:h-[250px] lg:h-[400px] ${cardHeight ? cardHeight : 'xl:h-[672px]'}`}
                />
              </span>
            ))}
      </Slider>
      : (
        <NoProduct cardHeight={cardHeight} iconSize={40} title='No Product Found' titleClass='font-medium text-2xl md:text-3xl' />
      ) }
      
    </>
  );
};

export default SliderComponent;
