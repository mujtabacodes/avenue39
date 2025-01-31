import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { generateSlug } from '@/config';
import { ICategory } from '@/types/types';
import { menuData } from '@/data/menu';

interface MenuLinkProps {
  menudata: ICategory;
  onLinkClick?: () => void;
  loading?: boolean;
}

const MenuLink: React.FC<MenuLinkProps> = ({
  menudata,
  onLinkClick,
}) => {
  const [subCategory, setSubCategory] = useState<ICategory[] | undefined>([]);
  useEffect(() => {
    const categoryName =
      menudata.name.toLowerCase() === 'lighting'
        ? 'Lighting'
        : menudata.name.toLowerCase() === 'home office'
          ? 'homeOffice'
          : menudata.name.toLowerCase();
    const menuItems = menuData[categoryName];
    const sortedSubcategories = menudata.subcategories?.sort((a, b) => {
      const indexA = menuItems.findIndex(item => item.title.toLowerCase() === a.name.toLowerCase());
      const indexB = menuItems.findIndex(item => item.title.toLowerCase() === b.name.toLowerCase());
      if (indexA === -1 && indexB === -1) {
        return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1;
      }
      if (indexA === -1) return -1;
      if (indexB === -1) return 1;
      return indexA - indexB;
    });
    setSubCategory(sortedSubcategories)
  }, [menudata]);
  return (
    <>
      {subCategory?.map((item, index) => (
        <Link
          href={item.name === 'Accessories' ? '/accessories'
            : `/${generateSlug(menudata.name)}/${generateSlug(item.name)}`
          }
          className={`flex gap-1 items-center`}
          key={index}
          onClick={onLinkClick}
        >{item.name}</Link>
      )
      )}
      <Link
        href='/products'
        className={`flex gap-1 items-center text-red-600 dark:text-red-600`}
      >Sale</Link>
    </>
  );
};

export default MenuLink;
