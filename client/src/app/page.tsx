import Services from '@/components/services/services';
import React from 'react';
import SimpleSlider from '@/components/heroslider/slider';
import DiscountCard from '@/components/ui/discount-card';
import { chairProducts, discountProducts, testimonialcards } from '@/data';
import SofaBanner from '@/components/discount-banner/sofa-banner';
import SaleBanner from '@/components/discount-banner/sale-banner';
import Container from '@/components/ui/Container';
import HotProductSlider from '@/components/card-slider/hot-product-slider';
import Testimonial from '@/components/testimonial/testimonial';
import CardsTabes from '@/components/card-tabs/card-slider';
import TimerSlider from '@/components/timer-slider/TimerSlider';
import Link from 'next/link';
import Image from 'next/image';
import DiscountBanner from '@/components/Home/discount-banner';
export default function Home() {

  return (
    <>
      <SimpleSlider />
      <Services />
      <DiscountCard productItems={discountProducts}  />
      <SofaBanner />
      <SaleBanner />
      <CardsTabes />
      <TimerSlider />
      <Container className="mt-4 flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-10 ">
          {chairProducts.map((item) => (
            <Link href="/products" key={item.id}>
              <Image
                src={item.imageUrl}
                alt="product image"
                className="w-full"
              />
              <div className="text-16 lg:text-[25px] font-bold mt-3 pb-1 border-b-2 w-max border-black">
                {item.title}
              </div>
            </Link>
          ))}
        </div>
      </Container>
      <HotProductSlider />
      <DiscountBanner/>
      <Testimonial testimonialitems={testimonialcards} />
    </>
  );
}
