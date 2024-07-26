import CheckoutForm from '@/components/forms/checkout-form';
import OrderPlace from '@/components/order-place/order-place';
import TopHero from '@/components/top-hero';
import { Button } from '@/components/ui/button';
import Container from '@/components/ui/Container';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LabelInput } from '@/components/ui/label-input';
import { checkout } from '@/data/data';
import React from 'react';

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
          <div className="flex w-full items-center space-x-2">
            <LabelInput labelClass='px-2' label='Have a coupon?' className='rounded-none' type='text' placeholder='Enter your coupon code' />
            <Button className='h-[58px] px-10 text-white'>Apply Coupon</Button>
          </div>
          <div className='mt-10'>
          <OrderPlace/>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Checkout;
