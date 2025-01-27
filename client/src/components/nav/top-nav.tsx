import React from 'react';
import Container from '../ui/Container';
import SocialLink from '../social-link';
import Link from 'next/link';
import Image from 'next/image';
import ramadan1 from '../../../public/images/ramadan12.png';
import ramadan2 from '../../../public/images/ramadan2.png';

const TopNav = () => {
  return (
    <div className="bg-main text-secondary p-2 hidden md:block ">
      <Container className="flex justify-between items-center gap-2">
        <div className="max-lg:hidden lg:w-3/12 min-w-24">
          <div className="w-fit"></div>
        </div>
        <div className="w-full lg:max-w-[58%] xl:max-w-[43%] 2xl:max-w-[40%] max-sm:pl-1 2xl:mr-6 relative">
          <p className=" gap-2  font-medium text-12 2xl:text-13 xl:whitespace-nowrap">   
          <Image className='absolute z-40 -left-40 -top-8 hidden xl:block' src={ramadan2} alt='ramadan1'/>
            <p className='uppercase tracking-[1.6px] '>
              This Ramadan elevate your home’s style with the best offers.{' '}
              <Link
                className="text-red-600 border-b border-red-600 hover:text-red-800"
                href={'products'}
              >
                SHOP SALE
              </Link>
            </p>        
            <Image className='absolute z-40 -right-40 2xl:-right-28 -top-10 hidden xl:block' src={ramadan1} alt='ramadan1'/>
          </p>
        </div>
        <div className="gap-3 lg:gap-3 flex justify-end items-center w-2/12">
          <SocialLink socialSize="text-[30px]" />
        </div>
      </Container>
    </div>
  );
};

export default TopNav;
