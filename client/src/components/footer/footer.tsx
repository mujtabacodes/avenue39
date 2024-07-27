import React from 'react';
import Container from '../ui/Container';
import Image from 'next/image';
import logo from '@icons/logo.png';
import { socialicons } from '@/data';
import { Button } from '../ui/button';
import { SiMastercard, SiVisa } from 'react-icons/si';
import { FaPaypal, FaStripe } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <section className="pt-16">
      <Container className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:gap-x-8 md:gap-x-12 lg:gap-x-16 gap-y-8 px-4">
        <div className="">
          <div>
            <Image src={logo} alt="logo" className="w-72" />
            <p className="my-11 font-normal text-14 leading-6 text-primary-foreground">
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo.
            </p>
            <div className="flex gap-4 items-center pt-6">
              {socialicons.map((item) => (
                <Image
                  key={item.id}
                  src={item.imageUrl}
                  alt={item.title}
                  className="h-8 object-contain"
                />
              ))}
            </div>
          </div>
        </div>
        <div className=" px-2">
          <h5 className="font-medium text-3xl">Quick Links</h5>
          <ul className="leading-[50px] font-normal text-20 text-primary-foreground mt-6">
            <li>About Us</li>
            <li>Delivery Information</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
            <li>Return Policy</li>
          </ul>
        </div>
        <div className=" px-2">
          <h5 className="font-medium text-3xl">Account Info</h5>
          <ul  className="leading-[50px] font-normal text-20 text-primary-foreground mt-6">
            <li>My Account</li>
            <li>Shopping Cart</li>
            <li>Wishlist</li>
            <li>Order History</li>
          </ul>
        </div>
        <div className="">
          <h5 className="font-medium text-3xl">Newsletter</h5>
          <p className="mt-6 text-primary-foreground">
            Get updates by subscribe our weekly newsletter
          </p>
          <form className="mt-6">
            <div className="relative">
              <input
                type="email"
                placeholder="Enter your mail adress"
                className="bg-black text-white w-full ps-3 py-5 rounded-2xl text-xs"
              />
              <Button
                variant={'secondary'}
                className="text-black absolute top-2 right-3 rounded-2xl"
              >
                Subscribe Now
              </Button>
            </div>
          </form>
        </div>
      </Container>
      <div className='bg-black mt-10 py-3 px-4'>
              <Container className='flex flex-wrap justify-center sm:justify-between items-center gap-x-8 gap-y-4'>
                <p className='text-white text-17 font-light text-center'>Copyright © 2024 avenue39. All rights reserved.</p>
                <div className="flex items-center gap-4">
                <SiVisa className='text-white' size={40} />
                <FaPaypal className='text-white' size={20} />
                <SiMastercard className='text-white' size={25} />
                <FaStripe className='text-white' size={40}/>
                </div>
              </Container>
      </div>
    </section>
  );
};

export default Footer;
