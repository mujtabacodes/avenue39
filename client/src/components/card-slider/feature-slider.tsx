'use client';
import React, { useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import FeatureCard from '../feature-card/feature-card';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { Feature, IProduct } from '@/types/types';
import { cards, features, products } from '@/data';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '@/config/fetch';
import NoProduct from '../ui/no-product';

interface SliderProps {
  cards: IProduct[];
  isModel?: boolean;
}

const FeatureSlider: React.FC = () => {

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

  const settings = {
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: products.length > 4 ? 4 : products.length,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: products && products.length > 3 ? 3 : products.length,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: products && products.length > 2 ? 2 : products.length,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: products && products.length > 1 ? 1 : products.length,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="slider-container">
      {products.length > 0 ? (
        <>
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
                <FeatureCard
                  card={card}
                  isLoading={isProductsLoading}
                  cardHeight="w-96 h-[400px]"
                />
              </div>
            ))}
          </Slider>
        </>
      ) : (
        <NoProduct
          cardHeight="2xl:h-[400px]"
          iconSize={40}
          title="No Product Found"
          titleClass="font-medium text-2xl md:text-3xl"
        />
      )}
    </div>
  );
};

export default FeatureSlider;
