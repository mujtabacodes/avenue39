'use client';
import React, { useState, useEffect } from 'react';
import Container from '../ui/Container';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import Image from 'next/image';
import MenuLink from '../menu-link';
import megamenu from '@icons/megamenu.png';
import { menuData } from '@/data/menu';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter, usePathname } from 'next/navigation';
import { generateSlug } from '@/config';

const MenuBar = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isSticky, setIsSticky] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const Navigate = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        target.closest('.megamenu-container') === null &&
        target.closest('.menu-item') === null
      ) {
        setActiveMenu(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleMegaSaleClick = () => {
    Navigate.push('/products');
  };

  const handleNavigation = (name: string) => {
    Navigate.push(`/products/${name}`);
  };

  return (
    <div className={`${isSticky ? 'sticky top-0 z-50' : 'relative md:pb-12'}`}>
      <div
        className={`bg-white shadow-md mb-1 pt-3 pb-2 hidden md:block z-50 ${isSticky ? '' : 'absolute w-full top-0'}`}
      >
        <Container className="flex flex-wrap items-center justify-between">
          {loading ? (
            <div className="flex gap-4">
              {Array.from({ length: 9 }).map((_, index) => (
                <Skeleton key={index} className="h-6 w-36" />
              ))}
            </div>
          ) : (
            Object.keys(menuData).map((menu) =>
              menu === 'megaSale' ? (
                <button
                  key={menu}
                  className={`menu-item text-12 lg:text-14 xl:text-17 font-semibold uppercase whitespace-nowrap text-red-600 dark:text-red-600 flex flex-row gap-2 items-center cursor-pointer ${pathname === '/products' ? 'linkactive' : 'link-underline'}`}
                  onClick={handleMegaSaleClick}
                >
                  MEGA SALE
                </button>
              ) : (
                <div
                  key={menu}
                  className={`menu-item text-12 lg:text-14 xl:text-17 font-semibold uppercase whitespace-nowrap text-black dark:text-black flex flex-row gap-2 items-center cursor-pointer ${pathname === `/products/${menu}`? 'linkactive' : 'link-underline'}`}
                  onMouseEnter={() => setActiveMenu(menu)}
                  onMouseLeave={() => setActiveMenu(null)}
                  onClick={() => handleNavigation(menu)}
                >
                  {menu.replace(/([A-Z])/g, ' $1').toUpperCase()}{' '}
                  <MdOutlineKeyboardArrowDown size={25} />
                </div>
              ),
            )
          )}
        </Container>
      </div>
      {activeMenu && !loading && (
        <div className="megamenu-container w-full bg-white shadow-lg p-10 z-50 absolute top-[50px]">
          <Container className="flex gap-4">
            <div className="w-8/12 space-y-4">
              <p className="text-19 font-bold w-96">
                {activeMenu.charAt(0).toUpperCase() + activeMenu.slice(1)}
              </p>
              <div className="border-b-4 w-14 border-red-600" />
              <div className="grid grid-cols-3 space-y-3">
                <MenuLink
                  menudata={menuData[activeMenu]}
                  onLinkClick={() => setActiveMenu(null)}
                  loading={loading}
                />
              </div>
            </div>
            {(activeMenu === 'bedroom' || activeMenu === 'megaSale') && (
              <div className="w-full md:w-4/12">
                <Image
                  className="object-contain"
                  width={500}
                  height={500}
                  src={megamenu}
                  alt="menu"
                />
              </div>
            )}
          </Container>
        </div>
      )}
    </div>
  );
};

export default MenuBar;
