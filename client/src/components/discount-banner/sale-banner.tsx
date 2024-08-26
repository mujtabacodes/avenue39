'use client';
import React from 'react';
import Container from '../ui/Container';
import { Button } from '../ui/button';
import Image from 'next/image';
import Salebanner from '@assets/images/banners/Sale-banner.png';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const SaleBanner: React.FC = () => {
  const router = useRouter();

  const handleBuyNowClick = () => {
    router.push('/checkout');
  };

  return (
    <section className="bg-lightbackground mt-4">
      <Container className="flex flex-wrap-reverse justify-center md:justify-between gap-4 md:gap-0 items-center ">
        <div className="flex items-center justify-center md:justify-start gap-3 w-full md:w-1/2 pb-6 md:pb-0">
          <h3 className="text-[#FF0000] text-6xl xs:text-8xl">40%</h3>
          <div className="space-y-0">
            <p className="text-primary-foreground text-16 xs:text-2xl">Discount</p>
            <h4 className="text-lg xs:text-2xl xl:text-3xl 2xl:text-4xl font-semibold">Florence TV Cabinet</h4>
            <div className="pt-1">
              <Link
                href="/products"
                className="bg-black py-3 px-7 rounded-full text-white hover:bg-white hover:text-black inline-block"
              >
                Buy Now
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 h-full">
          <Image src={Salebanner} alt="sale banner" className="w-full h-full" />
        </div>
      </Container>
    </section>
  );
};

export default SaleBanner;
