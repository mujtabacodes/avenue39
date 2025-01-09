'use client';
import React from 'react';
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
    product_price: 'AED150',
    image: sofa1,
    link: '/product/marlin-tub-swivel-chair-brown-cream',
  },
  {
    id: 2,
    title: 'Modern Office Desk',
    product_price: 'AED150',
    image: sofa1,
    link: '/product/modern-office-desk',
  },
  {
    id: 3,
    title: 'Luxury Sofa Set',
    product_price: 'AED150',
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
        pro_price: 'Home Office',
        subtitle: 'Magia Office Desk',
        link: '/product/magia-office-desk',
      },
      {
        backgroundImage: banner3.src,
        pro_price: 'Bedroom',
        subtitle: 'Mila TV Cabinet/TV Stand',
        link: '/product/mila-tv-cabinettv-stand',
      },
    ],
  },
  {
    id: 2,
    slides: [
      {
        backgroundImage: banner2.src,
        pro_price: 'Living Room',
        subtitle: 'Modern Sofa Set',
        link: '/product/modern-sofa-set',
      },
      {
        backgroundImage: banner3.src,
        pro_price: 'Dining Room',
        subtitle: 'Elegant Dining Table',
        link: '/product/elegant-dining-table',
      },
    ],
  },
];
const SofaBanner: React.FC = () => {

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2  gap-4 relative px-2 md:px-0 mt-10">
    <div className="sofa_slider1">
    <Swiper
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
            <div className="bg-lightforeground rounded-r-2xl flex items-center ps-5 xs:px-10 sm:ps-20 2xl:ps-32 min-h-[530px]">
              {/* Text Content */}
              <div className="w-1/2 xs:w-1/3">
                <div className="space-y-3">
                <Link href={slide.link}
                      className="bg-black py-2 px-6 rounded-full text-white hover:bg-main font-Helveticalight" >
                     Shop Best Sellers
                    </Link>
                  <h3 className="font-semibold text-xl sm:text-2xl mt-1">
                    {slide.title}
                  </h3>
                  <div className="lg:pt-0">
                    <p className="text-xs sm:text-14 font-normal text-black">
                    {slide.product_price}
                  </p>
                  </div>
                </div>
              </div>
              {/* Image */}
              <div className="w-1/2 xs:w-2/3 relative">
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
      <div className="flex justify-center items-center bg-[#0000004d] w-full h-full rounded-2xl">
        <div className="text-center space-y-3">
        <Link     href={slide.link}
              className="bg-black py-2 px-6 rounded-full text-white hover:bg-main"
            >
             Shop Home Office
            </Link>
         
          <h3 className="font-semibold text-xl sm:text-2xl mt-1 text-white">
            {slide.subtitle}
          </h3>
          <div className="lg:pt-0">
          <p className="text-xs sm:text-14 font-normal text-white">
            {slide.pro_price}
          </p>
          </div>
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
