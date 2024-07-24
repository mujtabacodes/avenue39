"use client";
import React, { useState } from 'react';
import Container from '../ui/Container';
import Link from 'next/link';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import Image from 'next/image';
import MenuLink from '../menu-link';

interface MenuItem {
  title: string;
  icon: string;
  link: string;
}

// Define the interface for menu data object
interface MenuData {
  [key: string]: MenuItem[];
}
const MenuBar = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const menuData: MenuData = {
    bedroom: [
      { link:"/",title: "Bedroom Set 1", icon: '/assets/3.png' },
      { link:"/",title: "Bedroom Set 2", icon: '/assets/2.png' },
      { link:"/",title: "Bedroom Set 1", icon: '/assets/3.png' },
      { link:"/",title: "Bedroom Set 2", icon: '/assets/2.png' },
      { link:"/",title: "Bedroom Set 1", icon: '/assets/3.png' },
      { link:"/",title: "Bedroom Set 2", icon: '/assets/2.png' },
      { link:"/",title: "Bedroom Set 1", icon: '/assets/3.png' },
    ],
    megaSale: [
      { link:"/",title: "Sale Item 1", icon: '/assets/5.png' },
      { link:"/",title: "Bedroom Set 1", icon: '/assets/3.png' },
      { link:"/",title: "Bedroom Set 2", icon: '/assets/2.png' },
    ]
  };

  const handleMenuClick = (menu: string) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };
  const handleMouseLeave = () => {
    setActiveMenu(null);
  };

  return (
    <>
      <div className='bg-white shadow-md mb-1 pb-2'>
        <Container className='flex gap-10 items-center justify-evenly whitespace-nowrap md:whitespace-normal overflow-y-scroll md:overflow-hidden'>
          <Link className='font-bold text-19 uppercase hover:underline' href={"/"}>DINING</Link>
          <div 
            className='font-bold text-19 uppercase hover:underline flex gap-2 items-center cursor-pointer' 
            onClick={() => handleMenuClick('bedroom')}
          >
            BEDROOM <MdOutlineKeyboardArrowDown size={25} />
          </div>
          <Link className='font-bold text-19 uppercase hover:underline' href={"/"}>BEDROOM</Link>
          <Link className='font-bold text-19 uppercase hover:underline' href={"/"}>BEDROOM</Link>
          <Link className='font-bold text-19 uppercase hover:underline' href={"/"}>DINING</Link>
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
        <div className='w-full bg-white shadow-lg p-10 z-50 absolute'>
          <Container className='flex gap-4'>
            <div className='w-8/12 space-y-4'>
              <p className='text-19 font-bold w-96'>
                {activeMenu === 'bedroom' ? 'Our Living Room Signature Style Premium Furniture' : 
                 activeMenu === 'dining' ? 'Our Dining Room Collection' : 
                 'Our Bedroom Collection'}
              </p>
              <div className='border-b-4 w-14 border-red-600'/>
              <div className='grid grid-cols-3 space-y-3' onClick={handleMouseLeave}>
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
