import React, { useState } from 'react';
import Container from '../ui/Container';
import Image from 'next/image';
import logo from '@icons/logo.png';
import { Button } from '../ui/button';
import SocialLink from '../social-link';
import Link from 'next/link';
import axios from 'axios';
import showToast from '../Toaster/Toaster';
import { paymentIcons } from '@/data/products';
import { menuData } from '@/data/menu';
import { generateSlug } from '@/config';
import { CiHeadphones } from 'react-icons/ci';
import { PiPhoneCallLight } from 'react-icons/pi';

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
      <div className="container w-1/2 flex flex-col items-center mx-auto mb-3">
        <Image src={logo} alt="logo" className="w-40" />

        <p className="mt-6 tracking-wide family-Helvetica text-13 lg:text-15">
          Get updates by subscribe our weekly newsletter
        </p>
        <form className="mt-6" onSubmit={handleNewsLetter}>
          <div className="relative">
            <input
              type="email"
              placeholder="Enter your mail address"
              className="bg-black text-white w-full ps-3 py-5 pe-[156px] lg:pe-[126px] xl:pe-[156px] rounded-2xl text-xs"
              value={email}
              onChange={handleChange}
              disabled={isLoading}
            />
            <Button
              variant={'secondary'}
              className="text-black absolute top-2 right-3 rounded-2xl px-2"
              disabled={isLoading}
            >
              {isLoading ? 'Subscribing...' : 'Subscribe Now'}
            </Button>
          </div>
        </form>
      </div>
      <Container className="grid grid-cols-12 sm:gap-x-4 md:gap-x-5 lg:gap-x-8 gap-y-8 px-4 mx-auto  items-center justify-center">
        <div className="col-span-12 sm:col-span-4 md:col-span-3 lg:col-span-2 px-2">
          <h5 className="font-medium tracking-wide family-Helvetica sm:text-lg xl:text-xl">
            Shop by Rooms
          </h5>
          <ul className=" leading-8 xl:leading-[45px] tracking-wide family-Helvetica text-13 lg:text-15 text-black mt-6 capitalize">
            {Object.keys(menuData)
              .filter((menu) =>
                ['dining', 'living', 'bedroom', 'homeOffice'].includes(menu),
              )
              .map((menu) => (
                <li key={menu}>
                  <Link
                    href={
                      menu === 'SALE'
                        ? '/products'
                        : `/products/${generateSlug(menu || '')}`
                    }
                    className="hover:underline capitalize"
                  >
                    {menu === 'SALE' ? (
                      <p className="text leading-8 text-red-500 dark:text-red-500 tracking-wide family-Helvetica text-13 lg:text-15 capitalize">
                        Sale
                      </p>
                    ) : (
                      menu.replace(/([A-Z])/g, ' $1')
                    )}
                  </Link>
                </li>
              ))}
          </ul>
        </div>

        <div className="col-span-12 sm:col-span-4 md:col-span-3 lg:col-span-2 px-2">
          <h5 className="font-medium tracking-wide family-Helvetica sm:text-lg xl:text-xl">
            Shop by Item
          </h5>
          <ul className=" leading-8 xl:leading-[45px] tracking-wide family-Helvetica text-13 lg:text-15 text-black mt-6 capitalize">
            {Object.keys(menuData)
              .filter((menu) =>
                ['chairs', 'tables', 'Lighting', 'Accessories'].includes(menu),
              )
              .map((menu) => (
                <li key={menu}>
                  <Link
                    href={
                      menu === 'SALE'
                        ? '/products'
                        : `/products/${generateSlug(menu || '')}`
                    }
                    className="hover:underline capitalize"
                  >
                    {menu === 'SALE' ? (
                      <p className="text leading-8 text-red-500 dark:text-red-500 tracking-wide family-Helvetica text-13 lg:text-15 capitalize">
                        Sale
                      </p>
                    ) : (
                      menu.replace(/([A-Z])/g, ' $1')
                    )}
                  </Link>
                </li>
              ))}
          </ul>
        </div>

        <div className="col-span-12 sm:col-span-4 md:col-span-3 lg:col-span-2 px-2">
          <h5 className="font-medium tracking-wide family-Helvetica sm:text-lg xl:text-xl">
            Terms & Policies
          </h5>
          <ul className=" leading-8 xl:leading-[45px] tracking-wide family-Helvetica text-13 lg:text-15 text-black mt-6">
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

        <div className="col-span-12 sm:col-span-4 md:col-span-3 lg:col-span-2">
          <h5 className="font-medium tracking-wide family-Helvetica sm:text-lg xl:text-xl">
            About
          </h5>
          <ul className="leading-8 xl:leading-[45px] tracking-wide family-Helvetica text-13 lg:text-15 text-black mt-6 capitalize">
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

        <div className="col-span-12 sm:col-span-4 md:col-span-3 lg:col-span-2">
          <h5 className="font-medium tracking-wide family-Helvetica sm:text-lg xl:text-xl">
            Get in Touch
          </h5>
          <div className="mt-8">
            <Link href="tel:+971505974495" target="_blank" rel="noreferrer">
              <div className=" w-full max-w-56 rounded-sm">
                <div className="flex items-center gap-2 py-2 px-2">
                  <p className="text-left text-13 lg:text-15 font-extralight leading-normal">
                    +971 50 597 4495
                  </p>
                </div>
              </div>
            </Link>
          </div>
          <div className="mt-4">
            <div className=" w-full max-w-56 rounded-sm">
              <Link
                href="mailto:cs@avenue.com"
                rel="noreferrer"
                target="_blank"
              >
                cs@avenue.com
              </Link>
            </div>
          </div>
          <div className="pt-5">
            <SocialLink socialSize="md:text-[25px]" />
          </div>
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
