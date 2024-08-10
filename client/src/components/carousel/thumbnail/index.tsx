//@ts-nocheck
'use client';

import React, { useState, useRef, useEffect } from 'react';
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
import Image from 'next/image';
import { FaSortDown } from 'react-icons/fa';
import { Skeleton } from '@/components/ui/skeleton'; // Adjust the path as necessary

export interface IMAGE_INTERFACE {
  public_id?: string;
  imageUrl?: string;
  name?: string;
}

interface ThumbProps {
  thumbs: IMAGE_INTERFACE[];
  isZoom?: Boolean;
  swiperGap?: String;
}

const Thumbnail: React.FC<ThumbProps> = ({ thumbs, isZoom, swiperGap }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const [backgroundPosition, setBackgroundPosition] = useState<string>('0% 0%');
  const [loading, setLoading] = useState(true);

  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<SwiperType | null>(null); // Ensure correct type

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // Simulate a loading time
    return () => clearTimeout(timer);
  }, []);

  const handleMouseEnter = (imageUrl: string) => {
    setHoveredImage(imageUrl);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const { top, left, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setBackgroundPosition(`${x}% ${y}%`);
  };

  const handleMouseLeave = () => {
    setHoveredImage(null);
  };

  const scrollToSlide = (direction: 'up' | 'down') => {
    if (swiperRef.current) {
      if (direction === 'up') {
        swiperRef.current.slidePrev();
      } else if (direction === 'down') {
        swiperRef.current.slideNext();
      }
    }
  };

  return (
    <div className="relative w-full">
      <div className={`w-full flex ${swiperGap} max-h-[650px]`}>
        <div className="max-w-1/5 md:flex-shrink-0 relative">
          {loading ? (
            <div className="flex flex-col space-y-4">
              <Skeleton className="h-36 w-36" />
              <Skeleton className="h-36 w-36" />
              <Skeleton className="h-36 w-36" />
              <Skeleton className="h-36 w-36" />
            </div>
          ) : (
            <Swiper
              onSwiper={(swiper) => {
                setThumbsSwiper(swiper);
                swiperRef.current = swiper;
              }}
              loop={true}
              spaceBetween={10}
              slidesPerView={4}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              className="h-full column-swipper swiper-container product-swiper w-fit mx-0"
            >
              {thumbs.map((thumb, index) => (
                <SwiperSlide
                  key={index}
                  className="column-swiper-slider swiper-slide"
                >
                  <Image
                    className="rounded-lg shadow-lg"
                    src={thumb.imageUrl || '/default-image.jpg'}
                    width={150}
                    height={150}
                    alt={thumb.name || 'Thumbnail'}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
          <div
            className="absolute -bottom-5 right-1/3 z-10 cursor-pointer bg-[#F6F6F6] w-12 h-12 flex justify-center items-center"
            onClick={() => scrollToSlide('up')}
          >
            <FaSortDown size={25} className="text-black flex items-center mb-2" />
          </div>
        </div>

        <div className="w-4/5 md:flex-grow relative">
          {loading ? (
            <Skeleton className="h-[600px] w-full" />
          ) : (
            <Swiper
              style={
                {
                  '--swiper-navigation-color': '#ffffff',
                  '--swiper-pagination-color': '#ffffff',
                } as React.CSSProperties
              }
              loop={true}
              spaceBetween={10}
              thumbs={{ swiper: thumbsSwiper }}
              modules={[FreeMode, Navigation, Thumbs]}
              className="h-full swiper-container"
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              onBeforeInit={(swiper) => {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
              }}
            >
              {thumbs.map((thumb, index) => (
                <SwiperSlide key={index}>
                  <div className={`relative w-full h-full ${isZoom ? 'cursor-zoom-in' : ''}`}>
                    <Image
                      onMouseEnter={() => handleMouseEnter(thumb.imageUrl || '')}
                      onMouseMove={handleMouseMove}
                      onMouseLeave={handleMouseLeave}
                      className="rounded-lg shadow-lg h-full w-full border-2 border-gray-100 max-h-[650px]"
                      src={thumb.imageUrl || '/default-image.jpg'}
                      width={550}
                      height={550}
                      alt={thumb.name || 'Main Image'}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>
      {hoveredImage && isZoom && (
        <div className="absolute -right-5 top-1 hidden md:block z-40">
          <div
            className="magnified-image fixed left-50 z-50 rounded-2xl"
            style={{
              backgroundImage: `url(${hoveredImage})`,
              backgroundPosition: backgroundPosition,
              backgroundRepeat: 'no-repeat',
              backgroundSize: '200%',
              width: '600px',
              height: '600px',
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Thumbnail;
