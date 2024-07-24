import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

// Define the interface for menu data
interface MenuItem {
  icon: string;
  title: string;
  link: string;
}

// Define the interface for props
interface MenuLinkProps {
  menudata: MenuItem[];
}

const MenuLink: React.FC<MenuLinkProps> = ({ menudata }) => {
  return (
    <>
      {menudata.map((item, index) => (
        <Link href={item.link} className='flex gap-2 items-center' key={index}>
          <div className='rounded-md h-20 w-20 border'>
            <Image src={item.icon} alt='menu' width={80} height={80} />
          </div>
          <span className='text-17 font-semibold'>{item.title}</span>
        </Link>
      ))}
    </>
  );
};

export default MenuLink;
