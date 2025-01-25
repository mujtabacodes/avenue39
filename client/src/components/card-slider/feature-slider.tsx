'use client';
import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { IProduct } from '@/types/types';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import CardSkaleton from '../Skaleton/productscard';
import Card from '../ui/card';

interface FeatureProps {
  similarProducts?: IProduct[];
  title?: boolean;
}

const FeatureSlider: React.FC<FeatureProps> = ({ similarProducts, title }) => {

  const swiperRef = useRef<any>(null);

  const next = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const previous = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };
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
    <div className="slider-container" onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      {similarProducts?.length ? (
        <>
          <div className={`text-end mb-3 px-4 flex ${title ? 'justify-between' : 'justify-end'}`}>
            {title && <p className="lg:text-3xl text-2xl text-left font-semibold ">
              Similar Products
            </p>}
            <div>
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
          </div>
          <Swiper
            ref={swiperRef}
            slidesPerView={1}
            spaceBetween={30}
            loop={false}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            navigation={{
              nextEl: '.button-next',
              prevEl: '.button-prev',
            }}
            breakpoints={{
              2000: {
                slidesPerView: 5,
              },
              1500: {
                slidesPerView: 5,
              },
              1290: {
                slidesPerView: 5,
              },
              1024: {
                slidesPerView: 4,
              },
              680: {
                slidesPerView: 3,
              },
              500: {
                slidesPerView: 2,
              },
              460: {
                slidesPerView: 1.5,
              }
            }}
            modules={[Navigation, Autoplay, Pagination]}
            className="mySwiper"
          >
            {
              similarProducts.map((card: IProduct) => (
                <SwiperSlide className='mb-10' key={card.id}>
                  <Card
                    card={card}
                    isLoading={false}
                    cardImageHeight="h-[280px] xsm:h-[220px] sm:h-[240px] md:h-[270px] xl:h-[220px] 2xl:h-[280px]"
                  />
                </SwiperSlide>
              ))}
          </Swiper>
        </>
      ) : (
        <CardSkaleton />
      )}
    </div>
  );
};

export default FeatureSlider;
