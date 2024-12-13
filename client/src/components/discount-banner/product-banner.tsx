import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '@/config/fetch';
import FeatureCard from '../feature-card/feature-card';
import { IProduct } from '@/types/types';
import { Navigation, Pagination } from 'swiper/modules';
import CardSkaleton from '../Skaleton/productscard';
import { ColorBannerData } from '@/data/products';
import banner8 from '@/assets/images/banners/banner8.png'; 
import offerIcon from '@/assets/offer-icon.jpg'; 
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { categories } from '@/data/data';
import { useParams } from 'next/navigation';
import Image from 'next/image';

const SwiperSlider: React.FC = () => {
  const {
    data: products = [],
    error: productsError,
    isLoading: isProductsLoading,
  } = useQuery<IProduct[], Error>({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  const { slug } = useParams();
  const parent = { slug };
  const mainparent = parent.slug;   

  const matchedCategory = categories.find((category: any) => category.maintitle === mainparent);
  const sliderData = matchedCategory?.data;

  const swiperRefLeft = React.useRef<any>(null);
  const swiperRefRight = React.useRef<any>(null);

  const next = () => {
    if (swiperRefLeft.current && swiperRefLeft.current.swiper && swiperRefRight.current && swiperRefRight.current.swiper) {
      swiperRefLeft.current.swiper.slideNext();
      swiperRefRight.current.swiper.slideNext();
    }
  };

  const previous = () => {
    if (swiperRefLeft.current && swiperRefLeft.current.swiper && swiperRefRight.current && swiperRefRight.current.swiper) {
      swiperRefLeft.current.swiper.slidePrev();
      swiperRefRight.current.swiper.slidePrev();
    }
  };

  return (
    <>
      {sliderData ? (
        <section className="flex flex-col lg:flex-row items-end justify-center h-auto text-black pb-10 categorySlider">
     
          <div className="md:w-[40%] w-full text-center mx-auto">
         
            <Swiper
              slidesPerView={1}
              spaceBetween={20}
              loop={true}
              navigation={false}
              pagination={{ clickable: true }}
              ref={swiperRefLeft}
              modules={[Navigation, Pagination]}
              className="mySwiper"
            >
              
              {sliderData?.LeftSideImage?.map((image: any, index: number) => (
                <SwiperSlide key={index} className="slider-image P-10  ">
                   <div className="sm:px-24 xsm:px-12 mt-4 ">
              <p className="text-lg font-medium pb-1">{sliderData?.topText}</p>
              <h2 className="lg:text-3xl text-2xl font-semibold pb-1">{sliderData?.heading}</h2>
              <p className="text-sm  font-normal pb-2">{sliderData?.subHeading}</p>
              <p className="lg:text-lg text-sm font-extralight">{sliderData?.paragraph}</p>
            </div>
                 <div className="px-3">
                 <Image
                    src={image.img}
                    className="w-auto m-auto h-auto object-cover lg:mt-20 md:mt-10 mt-10"
                    alt={`Left Image ${index + 1}`}
                    width={300}
                    height={300}
                  />
                 </div>
                </SwiperSlide>
              ))}
            </Swiper>
           
          </div>

          <div className="lg:w-[70%] w-full h-full rounded-2xl">
            <Swiper
              slidesPerView={1}
              spaceBetween={20}
              loop={true}
              navigation={false}
              pagination={{ clickable: true }}
              ref={swiperRefRight}
              modules={[Navigation, Pagination]}
              className="mySwiper"
            >
              {sliderData?.RightSideImage?.map((category: any) => (
                <SwiperSlide key={category.heading} className="mb-0">
                  <Image
                    src={category.img}
                    className="w-full h-auto object-cover "
                    alt={category.heading}
                    width={1200}
                    height={1200}
                    quality={100}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="absolute sm:left-12 left-1 sm:top-1/2 top-80 transform -translate-y-1/2 flex gap-2 z-40  ">
          {sliderData?.LeftSideImage?.length > 1 && (
            <button onClick={previous} aria-label="Previous slide" className="p-2 bg-gray-300 rounded-full">
              <IoIosArrowBack size={20} />
            </button>
          )}
        </div>
        <div className="absolute sm:right-12 right-1 sm:top-1/2 top-80 transform -translate-y-1/2 flex gap-2 z-40 ">
          {sliderData?.LeftSideImage?.length > 1 && (
            <button onClick={next} aria-label="Next slide" className="p-2 bg-gray-300 rounded-full">
              <IoIosArrowForward size={20} />
            </button>
          )}
        </div>
        </section>
      ) : <div
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
                    <span className="ms-4 line-through text-sm text-white opacity-65">
                      AED 599
                    </span>
                  </p>
                  <button
                    className="my-4 px-4 py-3 text-black bg-white border border-white rounded-full flex items-center justify-center gap-2 hover:bg-primary hover:text-white"
                    onClick={() => console.log('Add to Cart')}
                  >
                    <HiOutlineShoppingBag />
                    <span className="mr-2 text-xs">Add to cart</span>
                  </button>
                </div>
              </div>}
    </>
  );
};

export default SwiperSlider;

