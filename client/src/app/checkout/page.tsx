import CheckoutForm from '@/components/forms/checkout-form';
import OrderPlace from '@/components/order-place/order-place';
import TopHero from '@/components/top-hero';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import Container from '@/components/ui/Container';
import { products } from '@/data';
import { checkout } from '@/data/data';
import Image from 'next/image';
import React from 'react';
import tabby from "@assets/images/tabby.png"
import tamara from "@assets/images/tamara.png"
import Coupan from '@/components/coupan-code';
const Checkout = () => {
  return (
    <>
      <TopHero breadcrumbs={checkout} />
      <Container className="grid grid-cols-1 md:grid-cols-2 mt-10 md:gap-10">
        <div>
          <h2 className="text-[33px]">Checkout</h2>
          <CheckoutForm />
        </div>
        <div>
          <h2 className="text-[33px] mb-10">Promotional Code</h2>
          <Coupan label="Have a coupon?"/>
          <div className="mt-10 space-y-6">
            <div className="bg-[#EEEEEE] px-4 py-4 space-y-5">
              <p className="text-center text-[33px]">Your Order</p>
              <div className="mt-5 max-h-72 px-1 overflow-y-scroll custom-scrollbar">
                {products.map((product) => (
                  <OrderPlace key={product.id} product={product} />
                ))}
              </div>
              <div className='border-t-4 pt-6 flex justify-between items-center text-[#666666] text-18'>
                <p>Subtotal</p>
                <p>Dhs.<span>3000</span>.00</p>
              </div>
              <div className='border-t-4 pt-6 flex justify-between items-center text-[#666666] text-18' >
                <p>Subtotal</p>
                <p>Dhs.<span>3000</span>.00</p>
              </div>
              <div className='border-t-4 pt-6 flex justify-between items-center text-[#666666] text-18'>
                <p>Subtotal</p>
                <p className='text-black text-[25px]'>Dhs.<span>3000</span>.00</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Direct Bank Transfer
                </label>
              </div>
              <div className="bg-[#EEEEEE] px-4 py-4 space-y-5">
              <p className="text-12">Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order won’t be shipped until the funds have cleared in our account.</p>
            </div>

            <div className='flex items-center justify-between'>
                <div className='flex gap-4 items-center'>
                <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <Image width={100} height={100} src={tabby} alt='tabby'/>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <Image width={100} height={100} src={tamara} alt='tabby'/>
              </div>
                </div>
                <div>
                  <Button className="h-[58px] text-16 px-16 text-white">Pay Now</Button>
                </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Checkout;
