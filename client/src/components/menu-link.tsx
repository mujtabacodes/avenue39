import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Skeleton } from './ui/skeleton';
import { generateSlug } from '@/config';

export interface MenuItem {
  categoryId?: number;
  icon: string | StaticImageData;
  title: string;
  link: string;
}

interface MenuLinkProps {
  menudata: MenuItem[];
  onLinkClick: () => void;
  loading: boolean;
  pathname: string; 
}

const MenuLink: React.FC<MenuLinkProps> = ({
  menudata,
  onLinkClick,
  loading,
  pathname, 
}) => {
  return (
    <>
      {loading
        ? 
          Array.from({ length: 4 }).map((_, index) => (
            <div className="flex gap-2 items-center" key={index}>
              <Skeleton className="h-20 w-20 rounded-md border" />
              <Skeleton className="h-6 w-32 rounded-md" />
            </div>
          ))
        : 
          menudata.map((item, index) => {
            const isActive = pathname.includes(`${item.link}/${generateSlug(item.title)}`
            );

            return (
              <Link
                href={
                  item.title === 'Sale'
                    ? '/products'
                    : `${item.link}/${generateSlug(item.title)}${
                    true
                        // [
                        //   'Accessories',
                        //   'Dining Tables',
                        //   'Dining Chairs',
                        //   'Sofas',
                        //   'Armchairs',
                        //   'Accent Chairs',
                        //   'TV Cabinets',
                        //   'Side Table',
                        //   'Sofa Beds',
                        //   'Table Lamps',
                        //   'Bedside Tables',
                        //   'Office Tables',
                        //   'Coffee Tables',
                        //   'Side Tables',
                        //   'accessories',
                          
                        // ].includes(item.title)
                          ? `?id=${item.categoryId}`
                          : ''
                      }`
                }
                className={`flex gap-1 items-center  `}
                key={index}
                onClick={onLinkClick}
              >
                {/* <div className={`rounded-md h-20 w-20 p-2 border flex justify-center items-center ${
                  isActive ? 'border-main' : ''
                }`}>
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={80}
                    height={80}
                    className="h-[54px] w-[62px]"
                  />
                </div> */}
                <span
                  className={`text-13 family-Helvetica text-nowrap link-underline pb-1 ${
                    item.title === 'Sale'
                      ? 'text-red-500'
                      : ''
                  }`}
                >
                  {item.title}
                </span>
              </Link>
            );
          })}
    </>
  );
};

export default MenuLink;
