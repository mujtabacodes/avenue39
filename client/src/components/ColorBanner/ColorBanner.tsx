'use client';
import { ColorBannerData } from '@/data/products';
import Image from 'next/image';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css'; // Import Swiper styles
import 'swiper/css/pagination'; // Import Swiper pagination styles

const ColorBanner: React.FC = () => {
  return (
    <section className="py-10 w-full bg-[#EBEBEB]">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={false}
        pagination={{
          clickable: true,
        }}
        loop={false}
        className="custom-swiper"
      >
        {ColorBannerData.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col lg:flex-row items-center justify-center w-full">
              <div className="flex flex-col justify-center items-center lg:w-[30%] w-full pb-2 text-center mx-auto">
                <div className="px-14">
                  <p className="text-lg font-medium pb-1">{slide.TopTitle}</p>
                  <h2 className="text-2xl font-semibold pb-1">{slide.Heading}</h2>
                  <p className="text-sm font-normal pb-2">{slide.ShortText}</p>
                  <p className="text-18 font-extralight">{slide.Description}</p>
                </div>
                <div className="w-fit lg:h-full lg:mt-20 md:mt-10 mt-10">
                  <Image
                    src={slide.imageUrl2}
                    className="w-full h-auto object-cover"
                    alt="Left Image"
                    width={1200}
                    height={1200}
                    quality={100}
                  />
                </div>
              </div>
              <div className="lg:w-[70%] w-full ">
                <Image
                  src={slide.imageUrl}
                  className="w-full h-auto object-cover "
                  alt="Right Image"
                  width={1200}
                  height={1200}
                  quality={100}
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default ColorBanner;
