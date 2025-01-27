import React from 'react';
import Container from '../ui/Container';
import SocialLink from '../social-link';
import Link from 'next/link';
import { FaRegMoon } from 'react-icons/fa';
import { GiLantern } from 'react-icons/gi';

const TopNav = () => {
  return (
    <div className="bg-main text-secondary p-2 hidden md:block">
      <Container className="flex justify-between items-center gap-2">
        {/* Left space or placeholder */}
        <div className="max-lg:hidden lg:w-3/12 min-w-24">
          <div className="w-fit"></div>
        </div>

        {/* Center content with icons */}
        <div className="w-full lg:max-w-[58%] xl:max-w-[43%] 2xl:max-w-[40%] max-sm:pl-1 2xl:mr-6">
          <p className="flex justify-center gap-2 items-center font-medium text-12 2xl:text-13 xl:whitespace-nowrap">
            {/* Add moon icon */}
            <FaRegMoon size={22} className="text-white relative top-[1px]" />
            <span>
              This Ramadan elevate your home’s style with the best offers.
              <Link
                className="text-red-600 border-b border-red-600 hover:text-red-800"
                href={'products'}
              >
                SHOP SALE
              </Link>
            </span>
            {/* Add lantern icon */}
            <GiLantern size={22} className="text-white relative top-[1px]" />
          </p>
        </div>

        {/* Right section (Social links) */}
        <div className="gap-3 lg:gap-3 flex justify-end items-center w-2/12">
          <SocialLink socialSize="text-[30px]" />
        </div>
      </Container>
    </div>
  );
};

export default TopNav;
