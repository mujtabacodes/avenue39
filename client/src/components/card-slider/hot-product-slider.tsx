'use client';
import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid, Navigation } from 'swiper/modules'; // Import Navigation module
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/navigation'; // Import navigation styles
import Card from '../ui/card';
import Container from '../ui/Container';
import { IProduct } from '@/types/types';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '@/config/fetch';
import NoProduct from '../ui/no-product';
import { NavigationOptions } from 'swiper/types';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

const HotProductSlider: React.FC = () => {
  const {
    data: products = [],
    error: productsError,
    isLoading: isProductsLoading,
  } = useQuery<IProduct[], Error>({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  // Refs for the custom navigation buttons
  const prevButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <section className="mt-10">
      <Container className="slider-container w-full">
        <div className='flex justify-between items-center px-2 md:px-4'>
        <h2 className="text-xl xs:text-2xl sm:text-4xl mb-10 font-semibold">
          Hot Newest Products
        </h2>
        {
          products.length > 0 &&
          <div className="flex justify-between items-center gap-4 mb-4">
          <button
            ref={prevButtonRef}
            className="prev-btn  "
          >
            <MdKeyboardArrowLeft  size={30}/>

          </button>
          <button
            ref={nextButtonRef}
            className="next-btn  "
          >
            <MdKeyboardArrowRight size={30} />
          </button>
        </div>
        }
       
        </div>
  
        {products.length > 0 ? (
          <>
            {/* Custom Navigation Buttons */}
            

            <Swiper
              modules={[Grid, Navigation]} // Add Navigation module
              spaceBetween={30}
              pagination={{ clickable: true }}
              navigation={{
                prevEl: prevButtonRef.current, // Link custom button
                nextEl: nextButtonRef.current, // Link custom button
              } as NavigationOptions} 
              onBeforeInit={(swiper) => {
                const navParams = swiper.params.navigation as NavigationOptions;
                if (navParams) {
                  navParams.prevEl = prevButtonRef.current;
                  navParams.nextEl = nextButtonRef.current;
                }
                swiper.navigation.init();
                swiper.navigation.update();
              }}
              breakpoints={{
                1025: {
                  slidesPerView: 3,
                  grid: {
                    rows: products.length > 6 ? 2 : 1,
                    fill: 'row',
                  },
                },
                600: {
                  slidesPerView: 2,
                  grid: {
                    rows: 2,
                    fill: 'row',
                  },
                },
                480: {
                  slidesPerView: 2,
                  grid: {
                    rows: 2,
                    fill: 'row',
                  },
                },
              }}
            >
              {!isProductsLoading
                ? products.map((card) => (
                    <SwiperSlide key={card.id}>
                      <Card
                        className="w-full"
                        skeletonHeight="h-[300px] md:h-[250px] lg:h-[400px] xl:h-[672px]"
                        isLoading={isProductsLoading}
                        card={card}
                      />
                    </SwiperSlide>
                  ))
                : [...Array(3)].map((_, index) => (
                    <SwiperSlide key={index}>
                      <Card
                        isLoading={true}
                        className="w-full"
                        skeletonHeight="h-[300px] md:h-[250px] lg:h-[400px] xl:h-[672px]"
                      />
                    </SwiperSlide>
                  ))}
            </Swiper>
          </>
        ) : (
          <NoProduct
            iconSize={40}
            title="No Product Found"
            titleClass="font-medium text-2xl md:text-3xl"
          />
        )}
      </Container>
    </section>
  );
};

export default HotProductSlider;
