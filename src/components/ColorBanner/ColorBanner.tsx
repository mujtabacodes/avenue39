'use client';
import { ColorBannerData } from '@/data/products';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

const ColorBanner: React.FC = () => {
  const [isWide, setIsWide] = useState<number>(window.innerWidth);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (windowWidth > 1720) {
      const newWidth = 1720 - windowWidth * 0.7;
      setIsWide(newWidth - 60);
    } else {
      if (windowWidth >= 1024) {
        const newWidth = windowWidth - windowWidth * 0.7;
        setIsWide(newWidth - 60);
      } else if (windowWidth > 500) {
        const newWidth = windowWidth - windowWidth * 0.5;
        setIsWide(newWidth - 48);
      } else {
        setIsWide(windowWidth - 10);
      }
    }
  }, [windowWidth]);

  return (
    <section className=" py-3 xs:py-5 md:py-10 w-full bg-white sofa_swiper">
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
            <div className="flex flex-col lg:flex-row items-center justify-center w-full ">
              <div className="flex flex-col justify-center items-center lg:w-[30%] w-full pb-2 text-center mx-auto">
                <div style={{ width: `${isWide}px` }}>
                  <div className="font-Helveticalight">
                    <h2 className="text-2xl pb-1 uppercase font-semibold">
                      {slide.Heading}
                    </h2>
                    {/* <p className="text-sm font-normal pb-2">{slide.ShortText}</p> */}
                    <p className="text-18 font-extralight">
                      {slide.Description}
                    </p>
                  </div>
                  <div className="w-fit lg:h-full xl:mt-20 md:mt-10 mt-10 px-2 mx-auto">
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
