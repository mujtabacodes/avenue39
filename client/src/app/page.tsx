'use client';
import Services from '@/components/services/services';
import React, { Fragment } from 'react';
import SimpleSlider from '@/components/heroslider/slider';
import DiscountCard from '@/components/ui/discount-card';
import {
  cards,
  chairProducts,
  discountProducts,
  testimonialcards,
} from '@/data';
import SofaBanner from '@/components/discount-banner/sofa-banner';
import SaleBanner from '@/components/discount-banner/sale-banner';
import Container from '@/components/ui/Container';
import { Button } from '@/components/ui/button';
import banner4 from '@assets/images/banners/banner10.png';
import HotProductSlider from '@/components/card-slider/hot-product-slider';
import Testimonial from '@/components/testimonial/testimonial';
import CardsTabes from '@/components/card-tabs/card-slider';
import TimerSlider from '@/components/timer-slider/TimerSlider';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const router = useRouter();

  const handleBuyNowClick = () => {
    router.push('/checkout');
  };
  return (
    <Fragment>
      <SimpleSlider />
      <Services />
      <DiscountCard productItems={discountProducts} showSkeleton={false} />
      <SofaBanner />
      <SaleBanner />
      <CardsTabes />
      <TimerSlider />
      <Container className="mt-4 flex justify-center">
  <div className='grid grid-cols-1 md:grid-cols-2 gap-10 '>
{    chairProducts.map((item) => (
      <Link href="/products" key={item.id} >
        <Image src={item.imageUrl} alt="product image" className="w-full" />
        <div className='text-16 lg:text-[25px] font-bold mt-3 pb-1 border-b-2 w-max border-black'>{item.title}</div>
      </Link>
    ))}
    
  </div>

        


      </Container>
      <HotProductSlider />
      <div
        className="w-full h-screen flex justify-center items-center mt-4"
        style={{
          backgroundImage: `url(${banner4.src})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'bottom',
        }}
      >
        <div className="text-center  md:space-y-10">
          <p className="text-20 sm:text-24 lg:text-[28px] font-normal text-primary-foreground text-white">
            Get Discount Up to 80%
          </p>
          <h3 className="font-semibold text-[24px] sm:text-28 lg:text-[49px] sm:text-2xl mt-1 text-white">
            Blue Modern Stylish Sofa
          </h3>
          <div className="pt-10">
            <Link
              href="/products"
              className=" bg-white text-black font-semibold text-base py-5 px-24 md:text-[25px] rounded-[30px] hover:bg-black hover:text-white "
            >
              Buy Now
            </Link>
          </div>
        </div>
      </div>
      <Testimonial testimonialitems={testimonialcards} />
    </Fragment>
  );
}
