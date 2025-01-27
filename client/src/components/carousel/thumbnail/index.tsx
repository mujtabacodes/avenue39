//@ts-nocheck
'use client';
import React, { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import {
  FreeMode,
  Navigation,
  Thumbs,
  Swiper as SwiperType,
} from 'swiper/modules';
import { Skeleton } from '@/components/ui/skeleton';
import SideBySideMagnifier from '../SideBySideMagnifier';
import CustomThumbnailSlickSlider from './thumbnailSlider';

export interface IMAGE_INTERFACE {
  public_id?: string;
  imageUrl?: string;
  name?: string;
  altText?: string;
}

interface ThumbProps {
  thumbs: IMAGE_INTERFACE[];
  isZoom?: Boolean;
  swiperGap?: String;
  isLoading: boolean;
}

const Thumbnail: React.FC<ThumbProps> = ({
  thumbs,
  isZoom,
  swiperGap,
  isLoading,
  altText

}) => {
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const swiperImageRef = useRef<SwiperType | null>(null);
/* eslint-disable */
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  /* eslint-enable */
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  

  const handleSlideChange = (index: number) => {
    if (swiperImageRef.current) {
      swiperImageRef.current.slideTo(index);
      console.log(index,'index')
    }
  };

  return (
    <div>
      <div className="relative w-full">
        <div className={`w-full flex flex-col-reverse md:flex-row gap-2 sm:gap-3 md:gap-4 lg:gap-5 overflow-hidden ${swiperGap}`}>
          <CustomThumbnailSlickSlider thumbs={thumbs} isZoom={isZoom} onSlideChange={handleSlideChange} currentSlideIndex={currentSlideIndex} />
          <div
            className={`w-full md:w-9/12 2xl:w-4/5 md:flex-grow relative border-2 border-gray-100 shadow rounded-lg md:!max-h-[700px] lg:!max-h-[570px] xl:!max-h-[637px] 2xl:!max-h-[750px] 3xl:!max-h-[650px]`}
          >
            {isLoading ? (
              <Skeleton className="h-[90px] w-full" />
            ) : (
              <Swiper
                thumbs={{ swiper: currentSlide }}
                loop={false}
                spaceBetween={10}
                modules={[FreeMode, Navigation, Thumbs]}
                className="h-full swiper-container product-img"
                navigation={{
                  prevEl: prevRef.current,
                  nextEl: nextRef.current,
                }}
                onSwiper={(swiper) => {
                  swiperImageRef.current = swiper;
                }}
                onSlideChange={(swiper) => {
                  setCurrentSlideIndex(swiper.realIndex)
                }}
              >
                {thumbs.map((thumb, index) => (
                  <SwiperSlide key={index}>
                    <SideBySideMagnifier
                      imageSrc={thumb.imageUrl}
                      largeImageSrc={thumb.imageUrl}
                      altText={altText || 'Main Image'}
                      zoomScale={1.5}
                      inPlace={true}
                      alignTop={true}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Thumbnail;
