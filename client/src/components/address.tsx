import React from 'react';
import { RiMapPinFill } from 'react-icons/ri';
import SocialLink from './social-link';
import Link from 'next/link';

const Address = () => {
  return (
    <>
      <RiMapPinFill className="hidden md:block" size={30} />
      <div className="mt-5">
        <p className="text-[33px] flex items-center font-base gap-2 md:gap-0">
          <span className="block md:hidden">
            <RiMapPinFill size={30} />
          </span>{' '}
          Address
        </p>
        <p className="text-[19px] text-[#666666] font-medium">
          23 22nd St - Al Quoz Industrial Area 4 - Dubai–{' '}
          <span className="text-red-600">Map</span>
        </p>
      </div>
      <div className="mt-5">
        <p className="text-[33px] font-base">Contact Info</p>
        <ul>
          <li>
            <Link
              href="mailto:cs@avenue.com" target='_blank'
              className="text-[19px] text-[#666666] font-medium"
            >
              Email :<span>cs@avenue.com</span>
            </Link>
          </li>
          <li>
            <Link href="https://wa.me/+971505974495" target='_blank' className="text-[19px] text-[#666666] font-medium">
              WhatsApp :<span>+971 50 597 4495</span>
            </Link>
          </li>
          <li>
            <Link
              href="tel:+971 50 597 4495" target='_blank'
              className="text-[19px] text-[#666666] font-medium"
            >
              Phone :<span>+971 50 597 4495</span>
            </Link>
          </li>
        </ul>
        <SocialLink className="mt-4" />
      </div>
    </>
  );
};

export default Address;
