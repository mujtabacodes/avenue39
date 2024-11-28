
import React from 'react';
import TextIcon from '../text-icon';
import Container from '../ui/Container';
import { IoMailOutline, IoPhonePortraitOutline } from 'react-icons/io5';
import { P14 } from '@/styles/typo';
import SocialLink from '../social-link';
import Link from 'next/link';
import { products } from '@/data';

const TopNav = () => {
  return (
    <div className="bg-main text-secondary p-2 hidden md:block ">
      <Container className="flex  w-full justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          {/* <TextIcon
            link="tel:+971505974495"
            Title="+971 50 597 4495"
            Icon={<IoPhonePortraitOutline className="text-[18px] lg:text-xl" />}
          />
          <TextIcon
            link="mailto:cs@avenue.com"
            Title="cs@avenue.com"
            Icon={<IoMailOutline className="text-[18px]  lg:text-xl" />}

          /> */}

 
          <p className='font-extralight family-Helvetica text-14'>FALL CLEARANCE. Save up to 60% on Outdoor, Living, Dining, Bedroom & More. <Link className='text-red-600 border-b border-red-600' href={'products'} >SHOP SALE</Link></p>
        </div>
        {/* <P14 className="hidden md:block">
          Get Up To 50% off In your first Offer
        </P14> */}
        <div className=" ">
          <div className="flex  gap-4 ">
            <SocialLink socialSize="text-[30px]" className="mr" />
            <div className="h-5 border" />
            <Link
              className="text-14 tracking-wide family-Helvetica hover:underline text-white dark:text-white"
              href={'/about'}
            >
              About Us
            </Link>
            <Link
              className="text-14 tracking-wide family-Helvetica hover:underline text-white dark:text-white"
              href={'/contact'}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default TopNav;
