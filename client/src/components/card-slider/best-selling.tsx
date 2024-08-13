'use client';
import React, { useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import FeatureCard from '../feature-card/feature-card';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { IProduct } from '@/types/types';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '@/config/fetch';

interface SliderProps {
  cards: IProduct[];
  isModel?: boolean;
}

const settings = {
  arrows: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: false,
  pauseOnHover: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const BestSellingSlider: React.FC = () => {
  const {
    data: products = [],
    error: productsError,
    isLoading: isProductsLoading,
  } = useQuery<IProduct[], Error>({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });
  const sliderRef = useRef<Slider | null>(null);

  const next = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const previous = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  return (
    <div className="slider-container">
      <div className="text-end mb-3 px-4">
        <button
          className="button"
          onClick={previous}
          style={{ marginRight: '10px' }}
        >
          <IoIosArrowBack size={30} />
        </button>
        <button className="button" onClick={next}>
          <IoIosArrowForward size={30} />
        </button>
      </div>
      <Slider
        ref={(slider) => {
          sliderRef.current = slider;
        }}
        {...settings}
      >
        {products.map((card) => (
          <div key={card.id}>
            <FeatureCard isLoading={isProductsLoading} card={card} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BestSellingSlider;
