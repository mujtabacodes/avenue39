'use client';
import FeatureSlider from '@/components/card-slider/feature-slider';
import CartOrder from '@/components/cart-order/cart-order';
import CartItems from '@/components/cart/items';
import Services from '@/components/services/services';
import TopHero from '@/components/top-hero';
import Container from '@/components/ui/Container';
import { cartbredcrumbs } from '@/data/data';
import { State } from '@/redux/store';
import Link from 'next/link';
import React from 'react';
import { IoBagOutline } from 'react-icons/io5';
import {  useSelector } from 'react-redux';

const Cart = () => {
  const cartItems = useSelector((state: State) => state.cart.items);
  return (
    <>
      <TopHero breadcrumbs={cartbredcrumbs} />
      <Container className="mt-10 flex flex-wrap md:flex-nowrap gap-0 md:gap-10">
        {cartItems.length > 0 ? (
          <>
            <div className="w-full md:w-7/12 space-y-4">
              <CartItems isCartPage={true} />
              <div className="flex flex-wrap lg:flex-nowrap gap-5 justify-between items-center">
                <div className="">{/* <Coupan /> */}</div>
                <div className="">
                  <Link
                    href="/products"
                    className="bg-[#F6F6F6] px-6 flex justify-center items-center text-[#666666] h-[73px] hover:border-[#666666] border border-[#F6F6F6]"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
            <div className="w-full md:w-5/12">
              <CartOrder />
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center w-full h-96">
            <div className="flex flex-col gap-4 items-center">
              <IoBagOutline size={100} className="text-black" />
              <p className="font-medium text-2xl">No Items In Cart</p>
              <div className="">
                <Link
                  href="/products"
                  className="bg-[#F6F6F6] px-6 flex justify-center items-center  hover:border-[#666666] border-[#F6F6F6] text-[#666666] h-[73px]"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </Container>
      <Container className="mt-10 mb-20">
        <p className="text-[51px] font-medium text-center">Similar Products</p>
        <FeatureSlider />
      </Container>
      <Services />
    </>
  );
};

export default Cart;
