"use client"
import Aos from 'aos';
import React, { useEffect } from 'react'
import banner4 from '@assets/images/banners/banner10.png';
import Link from 'next/link';
import 'aos/dist/aos.css';

const DiscountBanner = () => {


  useEffect(() => {
    Aos.init({
      duration: 1000,
      once: false,
      offset: 150, 
      delay: 600, 
    });
  }, []);
  return (
    <div data-aos="fade-right" data-aos-duration="600" className=" mt-4">
        <div
          className="w-full h-screen flex justify-center items-center "
          style={{
            backgroundImage: `url(${banner4.src})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'bottom',
          }}
        >
          <div
            className="text-center md:space-y-10"
            data-aos="fade-up"
            data-aos-duration="700"
          >
            <p
              className="text-20 sm:text-24 lg:text-[28px] font-normal text-primary-foreground text-white"
              data-aos="fade-up"
              data-aos-duration="800"
            >
              Get Discount Up to 80%
            </p>

            <h3
              className="font-semibold text-[24px] sm:text-28 lg:text-[49px] sm:text-2xl mt-1 text-white"
              data-aos="fade-up"
              data-aos-duration="900"
            >
              Blue Modern Stylish Sofa
            </h3>

            <div className="pt-10" data-aos="flip-left" data-aos-duration="700">
              <Link
                href="/products"
                className="bg-white text-black font-semibold text-base py-5 px-24 md:text-[25px] rounded-[30px] hover:bg-black hover:text-white"
              >
                Buy Now
              </Link>
            </div>
          </div>
        </div>
      </div>
  )
}

export default DiscountBanner