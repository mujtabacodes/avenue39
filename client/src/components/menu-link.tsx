import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Skeleton } from './ui/skeleton';
import { generateSlug } from '@/config';

export interface MenuItem {
  categoryId?: number,
  icon: string | StaticImageData;
  title: string;
  link: string;
}

interface MenuLinkProps {
  menudata: MenuItem[];
  onLinkClick: any;
  loading: boolean;
}

const MenuLink: React.FC<MenuLinkProps> = ({
  menudata,
  onLinkClick,
  loading,
}) => {
  return (
    <>
      {loading
        ? // Render skeleton loaders while loading
        Array.from({ length: 4 }).map((_, index) => (
          <div className="flex gap-2 items-center" key={index}>
            <Skeleton className="h-20 w-20 rounded-md border" />
            <Skeleton className="h-6 w-32 rounded-md" />
          </div>
        ))
        : // Render menu items when not loading
        menudata.map((item, index) => (
          <Link
            href={`${item.link}/${generateSlug(item.title)}${['Accessories', 'Dining Tables', 'Dining Chairs', 'Sofas', 'Armchairs', 'Accent Chairs', 'TV Cabinets', 'Side Table', 'Sofa Beds', 'Table Lamps', 'Bedside Tables', 'Office Tables' , 'Coffee Tables' ,'Side Tables'].includes(item.title)
                ? `?id=${item.categoryId}`
                : ''
              }`}
            className="flex gap-2 items-center"
            key={index}
            onClick={onLinkClick}
          >
            <div className="rounded-md h-20 w-20 p-2 border flex justify-center items-center">
              <Image
                src={item.icon}
                alt={item.title}
                width={80}
                height={80}
                className='h-[54px] w-[62px]'
              />
            </div>
            <span className="text-17 font-semibold">{item.title}</span>
          </Link>
        ))}
    </>
  );
};

export default MenuLink;
