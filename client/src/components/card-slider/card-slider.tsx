
'use client';
import React, { useRef } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Card from '../ui/card';
import { IProduct } from '@/types/types';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import {Autoplay, Pagination } from 'swiper/modules';
import CardSkaleton from '../Skaleton/productscard';

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
  isLoading,
}) => {
  const swiperRef = useRef<any>(null);

  const handleMouseEnter = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.autoplay.stop();
    }
  };

  const handleMouseLeave = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.autoplay.start();
    }
  };
  return (
    <div onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <Swiper
       ref={swiperRef}
       slidesPerView={3}
       spaceBetween={30}
       loop={true}
       autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
        pagination={{
          clickable:true,
          dynamicBullets: true,
        }}
        modules={[Autoplay,Pagination]}
        className="mySwiper"
        breakpoints={{
          1280: {
            slidesPerView: 3,
            slidesPerGroup: 1,
            
          },
          1024: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            
          },
          895: {
            slidesPerView: 1.8,
            slidesPerGroup: 1,
            
          },
          771: {
            slidesPerView: 2,
            slidesPerGroup: 1,
            
          },
          580: {
            slidesPerView: 1.5,
            slidesPerGroup: 1,
            
          },
          420: {
            slidesPerView: 1.3,
            slidesPerGroup: 1,
            
          },
          200: {
            slidesPerView: 1,
            slidesPerGroup: 1,
            
          },
        }}
      >
       {isLoading ? <CardSkaleton /> : 

            cards && cards.map((card) => (
              <SwiperSlide key={card.id} className='mb-5'>
                <Card
                  isLoading={isLoading}
                  className="w-full"
                  card={card}
                  isModel={isModel}
                  skeletonHeight={`h-[400px] md:h-[250px] lg:h-[400px] ${
                    cardHeight ? cardHeight : 'xl:h-[672px]'
                  }`}
                />
              </SwiperSlide>
            ))}
      </Swiper>
    </div>
  );
};

export default SliderComponent;

