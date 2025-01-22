
import React from 'react';
import Container from '../ui/Container';
import SocialLink from '../social-link';
import Link from 'next/link';

const TopNav = () => {
  return (
    <div className="bg-main text-secondary p-2 hidden md:block ">
     <Container className='flex justify-between items-center gap-2'>
     <div className="max-lg:hidden lg:w-3/12 min-w-32">
          <div className="w-fit">
          </div>
        </div>
        <div className="w-full lg:max-w-[62%] xl:max-w-[58%] 2xl:max-w-[45%] ">
        <p className='font-medium text-12 xl:text-14 pl-3 2xl:pl-5 lg:text-center xl:whitespace-nowrap'>FALL CLEARANCE. SAVE UP TO 60% ON OUTDOOR, LIVING, DINING, BEDROOM & MORE. <Link className='text-red-600 border-b border-red-600' href={'products'} >SHOP SALE</Link></p>
        </div>
        <div className="gap-3 lg:gap-3 flex justify-end items-center w-2/12">
          <SocialLink socialSize="text-[30px]" />
        </div>
     </Container>
    </div>
  );
};

export default TopNav;