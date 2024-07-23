"use client";
import React, { useState } from 'react';
import Container from '../ui/Container';
import Link from 'next/link';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import mega from "../../../public/assets/megamenu.png";
import Image from 'next/image';
import MenuLink from '../menu-link';
// Define a union type for menu keys
type MenuKey = 'dining' | 'bedroom' | 'megaSale';

// Define the interface for menu data
interface MenuItem {
  title: string;
  icon: string;
}

// Define the interface for menu data object
interface MenuData {
  [key: string]: MenuItem[];
}
const MenuBar = () => {
  // State to track the currently active menu
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  // Menu data for different menus
  const menuData: MenuData = {
    dining: [
      { title: "Dining Set 1", icon: '/assets/1.png' },
      { title: "Dining Set 2", icon: '/assets/2.png' },
      // Add more items as needed
    ],
    bedroom: [
      { title: "Bedroom Set 1", icon: '/assets/3.png' },
      { title: "Bedroom Set 2", icon: '/assets/2.png' },
      { title: "Bedroom Set 1", icon: '/assets/3.png' },
      { title: "Bedroom Set 2", icon: '/assets/2.png' },
      { title: "Bedroom Set 1", icon: '/assets/3.png' },
      { title: "Bedroom Set 2", icon: '/assets/2.png' },
      { title: "Bedroom Set 1", icon: '/assets/3.png' },
      { title: "Bedroom Set 2", icon: '/assets/2.png' },
      // Add more items as needed
    ],
    megaSale: [
      { title: "Sale Item 1", icon: '/assets/5.png' },
      { title: "Sale Item 2", icon: '/assets/6.png' },
      // Add more items as needed
    ]
  };

  // Function to handle menu click
  const handleMenuClick = (menu: string) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  return (
    <>
      <div className='bg-white shadow-md mb-1 pb-2'>
        <Container className='flex gap-10 items-center justify-evenly'>
          <Link className='font-bold text-19 uppercase hover:underline' href={"/"}>DINING</Link>
          <div 
            className='font-bold text-19 uppercase hover:underline flex gap-2 items-center cursor-pointer' 
            onClick={() => handleMenuClick('bedroom')}
          >
            BEDROOM <MdOutlineKeyboardArrowDown size={25} />
          </div>
          <div 
            className='font-bold text-19 uppercase hover:underline cursor-pointer' 
            onClick={() => handleMenuClick('dining')}
          >
            DINING
          </div>
          <Link className='font-bold text-19 uppercase hover:underline' href={"/sdsa"}>BEDROOM</Link>
          <Link className='font-bold text-19 uppercase hover:underline' href={"/"}>DINING</Link>
          <button 
            className='font-bold text-19 uppercase hover:underline text-red-600'
            onClick={() => handleMenuClick('megaSale')}
          >
            Mega Sale
          </button>
        </Container>
      </div>

      {activeMenu && (
        <div className='w-full bg-white shadow-lg p-10 z-50'>
          <Container className='flex gap-4'>
            <div className='w-8/12 space-y-4'>
              <p className='text-19 font-bold w-96'>
                {activeMenu === 'bedroom' ? 'Our Living Room Signature Style Premium Furniture' : 
                 activeMenu === 'dining' ? 'Our Dining Room Collection' : 
                 'Our Bedroom Collection'}
              </p>
              <div className='border-b-4 w-14 border-red-600'/>
              <div className='grid grid-cols-3 space-y-3'>
              <MenuLink
                  menudata={menuData[activeMenu]}
                />  
              </div>
            </div>
            {activeMenu === 'bedroom' && (
              <div className='w-full md:w-4/12'>
                <Image className='object-contain' width={500} height={500} src={"/assets/megamenu.png"} alt='menu'/>
              </div>
            )}
          </Container>
        </div>
      )}
    </>
  );
};

export default MenuBar;
