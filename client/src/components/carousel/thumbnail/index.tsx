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
import { Skeleton } from '@/components/ui/skeleton';
import SideBySideMagnifier from '../SideBySideMagnifier';

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
  altText?: string;
  isLoading: boolean;
}

const Thumbnail: React.FC<ThumbProps> = ({
  thumbs,
  isZoom,
  swiperGap,
  isLoading,
   altText
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [loading, setLoading] = useState(true);
  const [isZoomedIn, setIsZoomedIn] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<SwiperType | null>(null);
  const swiperImageRef = useRef<SwiperType | null>(null);


  useEffect(() => {
    if (isLoading === false) {
      setLoading(false);
    }
  }, [isLoading]);
console.log(zoomPosition,zoomPosition)
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isZoomedIn) {
      const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - left) / width) * 100;
      const y = ((e.clientY - top) / height) * 100;
      setZoomPosition({ x, y }); // Update zoom position based on cursor
    }
  };

  const handleMouseEnter = () => {
    setIsZoomedIn(true); // Enable zoom on mouse enter
  };

  const handleMouseLeave = () => {
    setIsZoomedIn(false); // Disable zoom on mouse leave
  };

  // const handleClick = (
  //   imageUrl: string,
  //   public_id: string,
  //   e: React.MouseEvent,
  // ) => {
  //   if (isZoom) {
  //     setZoomEnabled((prev) => !prev);
  //     if (!zoomEnabled) {
  //       setHoveredImage(imageUrl);
  //       setCursorPosition({ x: e.clientX, y: e.clientY });
  //     }
  //   }
  // };


  return (
    <div>
     <div className="relative w-full">
  <div className={`w-full flex flex-col-reverse md:flex-row gap-2 sm:gap-3 md:gap-4 lg:gap-5 ${swiperGap}`}>
    {/* Left thumbnail swiper */}
    <div className="w-full md:w-3/12 lg:w-1/5 relative h-fit max-h-[300px] xs:max-h-[355px] sm:max-h-[550px] md:max-h-[400px] lg:max-h-[520px] xl:max-h-[420px] 2xl:max-h-[590px] 3xl:max-h-[650px]">
      {loading ? (
        <div className="flex flex-col space-y-4 pb-2">
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
          slidesPerView={2}  // Adjusted for mobile
          freeMode={true}
          direction="horizontal" // Horizontal for smaller screens
          breakpoints={{
            640: {
              direction: 'horizontal', // Horizontal for tablets
              slidesPerView: 3,
            },
            768: {
              direction: 'vertical', // Vertical for larger screens
              slidesPerView: 5,
            },
            1024: {
              direction: 'vertical',
              slidesPerView: 6,
            },
          }}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="column-swipper swiper-container product-swiper px-3 max-h-[228px] xs:max-h-[355px] sm:max-h-[550px] md:max-h-[400px] lg:max-h-[520px] xl:max-h-[420px] 2xl:max-h-[590px] 3xl:max-h-[650px] overflow-y-scroll custom-scrollbar"
        >
          {thumbs.map((thumb, index) => (
            <SwiperSlide
              key={index}
              className="column-swiper-slider swiper-slide"
              onMouseEnter={() => handleMouseEnter(thumb.imageUrl || '')}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <Image
                className={`rounded-lg shadow-md aspect-square ${isZoom ? 'md:h-[120px] 2xl:h-[160px] md:w-[120px] 2xl:w-[160px]' : 'h-[130px] w-[130px]'}`}
                src={thumb.imageUrl || '/default-image.jpg'}
                width={150}
                height={150}
                alt={thumb.altText || 'Thumbnail'}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      <div
className="absolute hidden lg:flex bottom-0 right-0 md:right-auto md:left-1/2 transform md:translate-x-[-50%] z-10 cursor-pointer bg-[#F6F6F6] w-12 h-12  justify-center items-center"
onClick={() => swiperImageRef.current?.slideNext()}
      >
        <FaSortDown size={25} className="text-black flex items-center mb-2" />
      </div>
    </div>

    {/* Main image section */}
    <div
      className={`w-full md:w-9/12 2xl:w-4/5 md:flex-grow relative border-2 border-gray-100 shadow rounded-lg md:!max-h-[700px] lg:!max-h-[570px] xl:!max-h-[637px] 2xl:!max-h-[750px] 3xl:!max-h-[650px]`}
    >
      {loading ? (
        <Skeleton className="h-[90px] w-full" />
      ) : (
        <Swiper
          thumbs={{ swiper: thumbsSwiper }}
          loop={true}
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
