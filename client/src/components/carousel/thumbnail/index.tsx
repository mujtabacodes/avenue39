//@ts-nocheck
'use client';
import React, { useState, useRef, useEffect, SetStateAction } from 'react';
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
import { CiZoomIn } from 'react-icons/ci';

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
  HoverImage?: React.Dispatch<SetStateAction<string | null>>;
  isLoading: boolean;
}

const Thumbnail: React.FC<ThumbProps> = ({
  thumbs,
  isZoom,
  swiperGap,
  HoverImage,
  isLoading,
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const [backgroundPosition, setBackgroundPosition] = useState<string>('0% 0%');
  const [loading, setLoading] = useState(true);
  const [zoomEnabled, setZoomEnabled] = useState<boolean>(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [cursorVisible, setCursorVisible] = useState<boolean>(false);

  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<SwiperType | null>(null);
  const swiperImageRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    if (isLoading === false) {
      setLoading(false);
    }
  }, [isLoading]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (zoomEnabled) {
      const { top, left, width, height } =
        e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - left) / width) * 100;
      const y = ((e.clientY - top) / height) * 100;
      setBackgroundPosition(`${x}% ${y}%`);
      setCursorPosition({ x: e.clientX, y: e.clientY });
    }
  };
  const scrollToNextImage = () => {
    if (swiperImageRef.current) {
      swiperImageRef.current.slideNext(); 
    }
  };

  const handleMouseLeave = () => {
    // setHoveredImage(null);
    setCursorVisible(false);
    // setZoomEnabled(false);
  };
  const handleMouseEnter = (
    imageUrl: string,
    public_id: string,
    e: React.MouseEvent,
  ) => {
    if (zoomEnabled) {
      // setZoomEnabled(true);
      setHoveredImage(imageUrl);
      setCursorVisible(true);
      setCursorPosition({ x: e.clientX, y: e.clientY });
    }
  };

  const handleClick = (
    imageUrl: string,
    public_id: string,
    e: React.MouseEvent,
  ) => {
    if (isZoom) {
      HoverImage && HoverImage(public_id);
      if (zoomEnabled) {
        setZoomEnabled(false);
        setCursorVisible(false);
      } else {
        setZoomEnabled(true);
        setHoveredImage(imageUrl);
        setCursorVisible(true);
        setCursorPosition({ x: e.clientX, y: e.clientY });
      }
    }
  };

 

  return (
    <div>
      <div className="relative w-full">
        <div className={`w-full flex gap-3 ${swiperGap} `}>
          <div className="w-3/12 md:w-1/5 2xl:w-1/5 lg:w-1/5 relative h-fit max-h-[228px] xs:max-h-[355px] sm:max-h-[550px] md:max-h-[400px] lg:max-h-[520px] xl:max-h-[420px] 2xl:max-h-[590px] 3xl:max-h-[650px] ">
            {loading ? (
              <div className="flex flex-col space-y-4 pb-2">
                <Skeleton className="h-36 w-36" />
                <Skeleton className="h-36 w-36" />
                <Skeleton className="h-36 w-36" />
                <Skeleton className="h-36 w-36" />
              </div>
            ) : (
              <Swiper
                style={{ overflowY: 'scroll' }}
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
                className="column-swipper swiper-container product-swiper px-3 max-h-[228px] xs:max-h-[355px] sm:max-h-[550px] md:max-h-[400px] lg:max-h-[520px] xl:max-h-[420px] 2xl:max-h-[590px] 3xl:max-h-[650px] overflow-y-scroll custom-scrollbar"
              >
                {thumbs.map((thumb, index) => (
                  <SwiperSlide
                    key={index}
                    className="column-swiper-slider swiper-slide"
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
              className="absolute -bottom-5 !right-36 md:!right-10 z-10 cursor-pointer bg-[#F6F6F6] w-12 h-12 flex justify-center items-center"
              // onClick={() => scrollToSlide('up')}
              onClick={scrollToNextImage}
            >
              <FaSortDown
                size={25}
                className="text-black flex items-center mb-2"
              />
            </div>
          </div>

          <div
            className={`w-9/12 2xl:w-4/5 md:flex-grow relative border-2 h-full border-gray-100 shadow rounded-lg `}
          >
            {loading ? (
              <Skeleton className="h-[590px] w-full" />
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
                className="h-full swiper-container product-img"
                navigation={{
                  prevEl: prevRef.current,
                  nextEl: nextRef.current,
                }}
                onBeforeInit={(swiper) => {
                  swiper.params.navigation.prevEl = prevRef.current;
                  swiper.params.navigation.nextEl = nextRef.current;
                }}
                onSwiper={(swiper) => {
                  swiperImageRef.current = swiper;
                }}
              >
                {thumbs.map((thumb, index) => (
                  <SwiperSlide key={index}>
                    <div
                      className={`relative w-full h-full ${isZoom ? (zoomEnabled ? 'cursor-none' : 'cursor-zoom-in') : 'cursor-default'}`}
                    
                      onMouseMove={handleMouseMove}
                      onMouseLeave={handleMouseLeave}
                      onMouseEnter={(e) =>
                        handleMouseEnter(
                          thumb.imageUrl || '',
                          thumb.public_id || '',
                          e,
                        )
                      }
                    >
                      <Image
                        className={`rounded-lg h-full object-cover w-full aspect-square pointer-events-none md:pointer-events-auto  ${zoomEnabled ? 'cursor-none' : ''} ${isZoom ? 'cursor-default' : ''} ${!zoomEnabled && isZoom ? 'cursor-zoom-in' : ''} md:max-h-[560px] xl:max-h-[420px] 2xl:max-h-[590px] 3xl:max-h-[650px]`}
                        src={thumb.imageUrl || '/default-image.jpg'}
                        width={700}
                        height={700}
                        alt={thumb.altText || 'Main Image'}
                        onMouseEnter={(e) =>
                          isZoom
                            ? handleClick(
                                thumb.imageUrl || '',
                                thumb.public_id || '',
                                e,
                              )
                            : undefined
                        }
                        onMouseLeave={(e) =>
                          isZoom
                            ? handleClick(
                                thumb.imageUrl || '',
                                thumb.public_id || '',
                                e,
                              )
                            : undefined
                        }
                        onMouseMove={handleMouseMove}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          
          </div>
        </div>
        {cursorVisible && zoomEnabled && (
          <div className="absolute -right-1/2 translate-x-[40%] top-1 hidden md:flex pt-24 z-40 h-[90vh] w-3/4 bg-white/70">
            <div
              className="magnified-image absolute left-50 top-0 z-50"
              style={{
                backgroundImage: `url(${hoveredImage})`,

                backgroundPosition: backgroundPosition,
                border: '1px solid #707070',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '300%',
                width: '500px',
                height: '500px',
              }}
            />
          </div>
        )}
        {cursorVisible && zoomEnabled && (
          <div
            className="fixed z-50 pointer-events-none"
            style={{
              left: cursorPosition.x,
              top: cursorPosition.y,
              transform: 'translate(-50%, -50%)',
              width: '100px',
              height: '100px',
              background: 'rgba(255, 255, 255, 0.7)',
              border: '1px solid #707070',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CiZoomIn size={30} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Thumbnail;
