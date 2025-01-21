'use client';
import React, { useRef } from 'react';
import Image from 'next/image';
import sofa1 from '@assets/images/banners/fdsdf.webp';
import banner2 from '@assets/images/banners/laptop-table.jpg';
import banner3 from '@assets/images/banners/freepik__enhance__60779.webp';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay ,Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Link from 'next/link';
const sofaData_slides = [
  {
    id: 1,
    title: 'Marlin Tub Swivel Chair',
    product_price: 'AED 1,800',
    image: sofa1,
    link: '/product/marlin-tub-swivel-chair-brown-cream',
  },
  {
    id: 2,
    title: 'Modern Office Desk',
    product_price: 'AED 1,800',
    image: sofa1,
    link: '/product/modern-office-desk',
  },
  {
    id: 3,
    title: 'Luxury Sofa Set',
    product_price: 'AED 1,800',
    image: sofa1,
    link: '/product/luxury-sofa-set',
  },
];

const sliderDataa_sofa = [
  {
    id: 1,
    slides: [
      {
        backgroundImage: banner2.src,
        pro_price: 'AED 4,800', 
        subtitle: 'Magia Office Desk',
        link: '/product/magia-office-desk',
        buttonPosition: 'top', 
      },
      {
        backgroundImage: banner3.src,
        pro_price: 'AED 4,800', 
        subtitle: 'Mila TV Cabinet/TV Stand',
        link: '/products',
        buttonPosition: 'bottom', 
      },
    ],
  },
  {
    id: 2,
    slides: [
      {
        backgroundImage: banner2.src,
        pro_price: 'AED 4,800', 
        subtitle: 'Modern Sofa Set',
        link: '/product/modern-sofa-set',
        buttonPosition: 'top', 
      },
      {
        backgroundImage: banner3.src,
        pro_price: 'AED 4,800', 
        subtitle: 'Elegant Dining Table',
        link: '/products',
        buttonPosition: 'bottom', 
      },
    ],
  },
];

const SofaBanner: React.FC = () => {

  const swiperRef = useRef<any>(null);

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
    <section className="grid grid-cols-1 lg:grid-cols-2  gap-4 relative px-2 md:px-0 md:mt-10">
    <div className="sofa_slider1">
    <Swiper
        ref={swiperRef}
        modules={[Autoplay, Pagination]}
        spaceBetween={20} 
        slidesPerView={1} 
        autoplay={{
          delay: 3000, 
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true, 
        }}
        loop={true}  
      >
        {sofaData_slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="bg-lightforeground max-xs:rounded-2xl xs:rounded-r-2xl flex flex-wrap items-center ps-5 xs:px-10 sm:ps-20 2xl:ps-32 min-h-[530px] 2xl:h-[740px]">
              {/* Text Content */}
              <div className="w-full xs:w-1/3 max-xs:text-center max-xs:pt-5">
                <div>
                <Link href={slide.link}
                      className="py-1 px-3 bg-white text-[14px] md:text-2xl lg:text-sm xl:text-xl 2xl:text-2xl rounded-full text-black border border-gray-500 hover:bg-main font-Helveticalight" >
                     Shop Best Sellers
                    </Link>
                  <h3 className="font-bold text-16 mt-3">
                    {slide.title}
                  </h3>
                    <p className="text-18 font-bold mt-1 text-black">
                    {slide.product_price}
                  </p>
                </div>
              </div>
              {/* Image */}
              <div className="w-full xs:w-2/3 relative">
                <Image
                  src={slide.image}
                  width={900}
                  height={500}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>


  <div className="sofa_slider2">
  <Swiper
    modules={[Autoplay, Pagination]}
    spaceBetween={30}
    slidesPerView={1}
    autoplay={{
      delay: 3000,
      disableOnInteraction: false,
    }}
    pagination={{ clickable: true }}
    loop={true}
  >
    {sliderDataa_sofa.map((item) => (
      <SwiperSlide key={item.id}>
        <div className="grid grid-cols-1 gap-4 min-h-[530px]">
          {item.slides.map((slide, index) => (
            <div
              key={index}
              className="w-full h-full rounded-2xl"
               style={{
                backgroundImage: `url(${slide.backgroundImage})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
              }}
            >
              <div className="flex justify-center items-center bg-[#0000004d] w-full h-full rounded-2xl 2xl:h-[360px]">
                <div className="text-center">
                  {slide.buttonPosition === 'top' && (
                      <Link
                        href={slide.link}
                        className="bg-white py-1 px-3 text-base md:text-3xl rounded-2xl text-black hover:bg-main font-Helveticalight"
                      >
                        Shop {slide.pro_price}
                      </Link>
                  )}
                  {slide.buttonPosition === 'bottom' && (
                      <Link
                        href={slide.link}
                        className="bg-white py-1 px-3 text-base md:text-3xl rounded-2xl text-black hover:bg-main font-Helveticalight"
                      >
                        Shop <span className='text-red-600'>Sale</span>
                      </Link>
                  )}

                  <h3 className="font-bold text-16 mt-4 text-white">
                    {slide.subtitle}
                  </h3>
                    <p className="text-18 font-bold text-white mt-2">
                      {slide.pro_price} 
                    </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
</div>





    </section>
  );
};

export default SofaBanner;
