import React, { useState } from 'react';
import Container from '../ui/Container';
import Image from 'next/image';
import logo from '@icons/logo.png';
import { Button } from '../ui/button';
import { SiMastercard, SiVisa } from 'react-icons/si';
import { FaPaypal, FaStripe } from 'react-icons/fa';
import SocialLink from '../social-link';
import Link from 'next/link';
import axios from 'axios';
import showToast from '../Toaster/Toaster';
import { paymentIcons } from '@/data/products';

const Footer: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleNewsLetter = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      alert('Please enter a valid email address.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/newsletters/add-email`,
        {
          email,
        },
      );
      console.log(response);
      if (response.status === 201) {
        showToast('success', response.data.message);
        setEmail('');
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        alert(
          error.response?.data?.message ||
            'Failed to subscribe. Please try again.',
        );
      } else {
        alert('An error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="pt-16 border-t border-[#EEEEEE] bg-white text-black dark:text-black">
      <Container className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:gap-x-8 md:gap-x-12 lg:gap-x-16 gap-y-8 px-4">
        <div className="">
          <div>
            <Image src={logo} alt="logo" className="w-72" />
            <p className="my-11 font-normal text-13 leading-6 text-primary-foreground">
            Avenue39 is more than just a furniture store; it&apos;s a philosophy that blends contemporary design with timeless aesthetics. We understand the importance of creating a harmonious environment that reflects your unique personality and taste. Each piece in our collection is thoughtfully selected to offer a perfect fusion of form and function.
            </p>
            <div className="pt-5">
              <SocialLink socialSize="md:text-[25px]" />
            </div>
          </div>
        </div>
        <div className=" px-2">
          <h5 className="font-medium text-3xl">Quick Links</h5>
          <ul className="leading-[45px] font-normal text-19 text-primary-foreground mt-6">
            <li>
              <Link href="/shipping-policy" className="hover:underline">
                Shipping Policy
              </Link>
            </li>
            <li>
              <Link href="/privacy-policy" className="hover:underline">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms-condition" className="hover:underline">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link href="/return-policy" className="hover:underline">
                Return Policy
              </Link>
            </li>
          </ul>
        </div>
        <div className=" px-2">
          <h5 className="font-medium text-3xl">Account Info</h5>
          <ul className="leading-[45px] font-normal text-19 text-primary-foreground mt-6">
            <li>
              <Link href="/profile" target="_self" className="hover:underline">
                My Account
              </Link>
            </li>
            <li>
              <Link href="/about" target="_self" className="hover:underline">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/cart" target="_self" className="hover:underline">
                Shopping Cart
              </Link>
            </li>
            <li>
              <Link
                href="/order-history"
                target="_self"
                className="hover:underline"
              >
                Order History
              </Link>
            </li>
          </ul>
        </div>
        <div className="">
          <h5 className="font-medium text-3xl">Newsletter</h5>
          <p className="mt-6 text-primary-foreground">
            Get updates by subscribe our weekly newsletter
          </p>
          {/* <form className="mt-6" onSubmit={handleNewsLetter}>
            <div className="relative">
              <input
                type="email"
                placeholder="Enter your mail adress"
                className="bg-black text-white w-full ps-3 py-5 pe-[156px] rounded-2xl text-xs"
              />
              <Button
                variant={'secondary'}
                className="text-black absolute top-2 right-3 rounded-2xl"
              >
                Subscribe Now
              </Button>
            </div>
          </form> */}
          <form className="mt-6" onSubmit={handleNewsLetter}>
            <div className="relative">
              <input
                type="email"
                placeholder="Enter your mail address"
                className="bg-black text-white w-full ps-3 py-5 pe-[156px] rounded-2xl text-xs"
                value={email}
                onChange={handleChange}
                disabled={isLoading}
              />
              <Button
                variant={'secondary'}
                className="text-black absolute top-2 right-3 rounded-2xl"
                disabled={isLoading}
              >
                {isLoading ? 'Subscribing...' : 'Subscribe Now'}
              </Button>
            </div>
          </form>
        </div>
      </Container>
      <div className="bg-main mt-10 py-3 px-4">
        <Container className="flex flex-wrap justify-center sm:justify-between items-center gap-x-8 gap-y-4 pb-16 md:pb-0">
          <p className="text-white text-17 font-light text-center">
            Copyright © 2024 avenue39 All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {/* <SiVisa className="text-white" size={40} />
            <FaPaypal className="text-white" size={20} />
            <SiMastercard className="text-white" size={25} />
            <FaStripe className="text-white" size={40} /> */}
             <div className="flex justify-between space-x-4">
             {paymentIcons.map((icon, index) => (
          <div key={index} className="w-14 h-auto p-1">
            <Image
              src={icon.src} 
              alt={icon.alt}
              width={64} 
              height={60} 
              className="object-contain shadow"
            />
          </div>
        ))}
      </div>
          </div>
        </Container>
      </div>
    </section>
  );
};

export default Footer;
