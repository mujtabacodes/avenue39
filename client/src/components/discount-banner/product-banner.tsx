'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { Navigation, Pagination } from 'swiper/modules';
import banner8 from '@/assets/images/banners/banner8.png';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { categories } from '@/data/data';
import { useParams } from 'next/navigation';
import Image from 'next/image';

interface ProductBannerProps {
  showArrows?: boolean;
  showFallback?: boolean;
}

const ProductBanner: React.FC<ProductBannerProps> = ({
  showArrows = true,
  showFallback = true,
}) => {
  const { slug } = useParams();
  const parent = { slug };
  const mainparent = parent.slug;

  const matchedCategory = categories.find(
    (category: any) => category.maintitle === mainparent
  );
  const sliderData = matchedCategory?.data;

  const swiperRef = React.useRef<any>(null);

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
  

  return (
    <>
      {sliderData ? (
          <div className="overflow-hidden min-h-[200px] sm:min-h-[250px] md:min-h-[300px] max-h-[500px]">
          <section className="categorySlider grid grid-cols-1 lg:grid-cols-1 sm:items-start xsm:items-center justify-center items-center text-black pb-10 gap-6">
            <div className="md:w-full w-full text-center mx-auto">
              <Swiper
                slidesPerView={1}
                spaceBetween={20}
                loop={true}
                navigation={showArrows}
                pagination={{ clickable: true }}
                ref={swiperRef}
                modules={[Navigation, Pagination]}
                className="mySwiper"
              >
                {sliderData?.LeftSideImage?.map((image: any, index: number) => (
                  <SwiperSlide key={index} className="slider-image px-10">
                    <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-4 h-fit">
                      <div className="sm:px-20 md:px-10 xsm:px-12 mt-4 flex flex-col justify-end">
                        <div className="lg:mb-10 md:mb-8">
                          <p className="text-lg font-medium pb-1">{sliderData?.topText}</p>
                          <h2 className="lg:text-3xl text-2xl font-semibold pb-1">{sliderData?.heading}</h2>
                          <p className="text-sm font-normal pb-2">{sliderData?.subHeading}</p>
                          <p className="xl:text-lg text-14 font-extralight">{sliderData?.paragraph}</p>
                        </div>
                        <div className="px-3 h-28">
                          <Image
                            src={image.img}
                            className="w-full m-auto h-full object-contain mt-2"
                            alt={`Left Image ${index + 1}`}
                            width={300}
                            height={300}
                          />
                        </div>
                      </div>

                      <div className="mt-4 w-full xsm:w-9/12">
                        <Image
                          src={sliderData?.RightSideImage[index]?.img}
                          className="w-full m-auto object-cover mt-2"
                          alt={`Right Image ${index + 1}`}
                          width={1200}
                          height={1200}
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Arrows Only If `showArrows` is True */}
            {showArrows && sliderData?.LeftSideImage?.length > 1 && (
              <>
                <div className="absolute sm:left-12 left-1 sm:top-96 top-80 transform -translate-y-top-96 flex gap-2 z-10">
                  <button onClick={previous} aria-label="Previous slide" className="p-2 bg-gray-300 rounded-full">
                    <IoIosArrowBack size={20} />
                  </button>
                </div>

                <div className="absolute sm:right-12 right-1 sm:top-96 top-80 transform -translate-y-top-96 flex gap-2 z-10">
                  <button onClick={next} aria-label="Next slide" className="p-2 bg-gray-300 rounded-full">
                    <IoIosArrowForward size={20} />
                  </button>
                </div>
              </>
            )}
          </section>
        </div>
      ) : (
        showFallback && (
          <div
            className="w-full h-[437px] px-9 py-12 flex items-center rounded-2xl"
            style={{
              backgroundImage: `url(${banner8.src})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}
          >
            <div>
              <p className="text-white text-20 font-light tracking-widest mt-4">
                Get Discount Up to 50%
              </p>
              <h1 className="text-white text-4xl font-normal max-w-sm">
                Lincoln{' '}
                <span className="font-bold">
                  Leather <span className="font-semibold">Chair</span>
                </span>{' '}
                & Footstool
              </h1>
              <p className="text-white text-md font-light mt-4">
                AED 499
                <span className="ms-4 line-through text-sm text-white opacity-65">AED 599</span>
              </p>
              <button
                className="my-4 px-4 py-3 text-black bg-white border border-white rounded-full flex items-center justify-center gap-2 hover:bg-primary hover:text-white"
                onClick={() => console.log('Add to Cart')}
              >
                <HiOutlineShoppingBag />
                <span className="mr-2 text-xs">Add to cart</span>
              </button>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default ProductBanner;
