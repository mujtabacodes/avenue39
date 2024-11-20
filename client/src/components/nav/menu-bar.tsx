'use client';
import React, { useState, useEffect } from 'react';
import Container from '../ui/Container';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import Image from 'next/image';
import MenuLink from '../menu-link';
import megamenu from '@icons/megamenu.png';
import { menuData } from '@/data/menu';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { generateSlug } from '@/config';
import Link from 'next/link';

const MenuBar = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isSticky, setIsSticky] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [hoveringMenu, setHoveringMenu] = useState<boolean>(false);
  const route = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const categoryId: string | any = searchParams.get('id');
  const [ActivatedMenu, setActivatedMenu] = useState<string | null>(null);
  const [isActiveMenu, setisActiveMenu] = useState<string | null>(null);

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
    route.push('/products');
  };

  const handleCategoryMenuClick = (menu: string) => {
    setActiveMenu(menu);
    setActivatedMenu(menu)
    if (menu === 'homeOffice') {
      route.push(`/products/home-office`);
    } else if (menu === 'NewArrivals') {
      route.push(`/products/new-arrivals`);
    } else {
      route.push(`/products/${generateSlug(menu)}`);
    }
  };

  const handleMouseEnter = (menu: string) => {
    setActiveMenu(menu);
  };

  const handleMouseLeave = () => {
    if (!hoveringMenu) {
      setActiveMenu(null);
    }
  };




  let CategoryFunction = () => {
    let menu: string = ActivatedMenu || ""
    // console.log(pathname, "pathname")
    if (pathname === "/products") {
      setisActiveMenu("SALE")
      return
    }
    if (pathname === "/products/new-arrivals") {
      setisActiveMenu("New Arrivals")
      return
    }

    if (!categoryId) {
      let categoryName = pathname.split('/').pop()?.replaceAll('-','')
// console.log(categoryName, "categoryName")

      for (const key in menuData) {
        const items = menuData[key];

        if (categoryName?.toLowerCase() === generateSlug(key).toLowerCase()) {
          setisActiveMenu(key)
          return key;
        }
      }

    }

    for (const key in menuData) {
      const items = menuData[key];
      console.log(items, "item")
      if (categoryId && items.some(item => item.categoryId == categoryId)) {
        console.log(key, "item")
        setisActiveMenu(key)
        return key;
      }
    }
    return null;
  }



  useEffect(() => {
    setisActiveMenu(null);
    CategoryFunction()

  }, [activeMenu, categoryId, pathname])

  // console.log(isActiveMenu, "isActiveMenu")


  return (
    <div className={`${isSticky ? 'sticky top-20 z-50' : 'relative md:pb-12'}`}>
      <div
        className={`bg-white shadow-md mb-1 pt-3 hidden md:block z-50 ${isSticky ? '' : 'absolute w-full top-0'
          }`}
      >
        <Container className="flex flex-wrap items-center justify-between">
          {loading ? (
            <div className="flex gap-4">
              {Array.from({ length: 9 }).map((_, index) => (
                <Skeleton key={index} className="h-6 w-36" />
              ))}
            </div>
          ) : (
            Object.keys(menuData).map((menu , index) => {
              if (menu === 'SALE') {
                return (
                  <button
                    key={menu}
                    className={`
                      
                      menu-item text-14 pb-2 tracking-wide family-Helvetica uppercase whitespace-nowrap text-red-600 dark:text-red-600 flex flex-row gap-2 items-center cursor-pointer ${(isActiveMenu && isActiveMenu) == menu ? 'linkactive' : 'link-underline'
                      }`}
                    onClick={handleMegaSaleClick}
                  >
                    SALE
                  </button>
                );
              }

              if (['New Arrivals', 'Clearance', 'Accessories'].includes(menu)) {
                // console.log(menu, "menue")
                return (
                  <Link
                    href={`/products/${generateSlug(menuData[menu][0]?.title || '',)}`}
                    key={menu}
                    className={`menu-item text-14 pb-2 tracking-wide family-Helvetica uppercase whitespace-nowrap text-black dark:text-black flex flex-row gap-2 items-center cursor-pointer ${(isActiveMenu && isActiveMenu) == menu ? 'linkactive' : 'link-underline'
                      }`}
                    onClick={() => handleCategoryMenuClick(menu)}

                  >
                    {menu.replace(/([A-Z])/g, ' $1').toUpperCase()}
                  </Link>
                );
              }

              return (
                <div className='relative' key={menu}>
                  <div
                    className={`relative menu-item text-14 pb-2 tracking-wide family-Helvetica uppercase whitespace-nowrap text-black dark:text-black flex flex-row gap-2 items-center cursor-pointer ${(isActiveMenu && isActiveMenu === menu ? 'linkactive' : 'link-underline')}`}
                    onMouseEnter={() => handleMouseEnter(menu)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleCategoryMenuClick(menu)}
                  >
                    {menu.replace(/([A-Z])/g, ' $1').toUpperCase()}
                  </div>

                  {activeMenu &&
                    !loading &&
                    activeMenu === menu && (
                      <div className={`megamenu-container w-[200px] bg-white shadow-lg p-10 z-50  absolute top-[28px] `}
                        onMouseEnter={() => setHoveringMenu(true)}
                        onMouseLeave={() => {
                          setHoveringMenu(false);
                          setActiveMenu(null);
                        }}
                      >
                        <div className="flex gap-4">
                          <div className="w-full space-y-4">
                            <div className="grid grid-cols-1 space-y-2">
                              <MenuLink
                                menudata={menuData[activeMenu]}
                                onLinkClick={() => setActiveMenu(null)}
                                loading={loading}
                                pathname={pathname}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                </div>

              );
            })
          )}
        </Container>
      </div>

      {/* {activeMenu &&
        !loading &&
        activeMenu !== 'tvCabinets' &&
        activeMenu !== 'clearance' && (
          <div
            className="megamenu-container w-fit bg-white shadow-lg p-10 z-50 absolute top-[40px]"
          onMouseEnter={() => setHoveringMenu(true)}
          onMouseLeave={() => {
            setHoveringMenu(false);
            setActiveMenu(null);
          }}
          >
            <Container className="flex gap-4">
              <div className="w-full space-y-4">
                <p className="text-19 font-bold w-96">
                  {activeMenu.charAt(0).toUpperCase() + activeMenu.slice(1)}
                </p>
                <div className="border-b-4 w-14 border-main" />
                <div className="grid grid-cols-1 space-y-2">
                  <MenuLink
                    menudata={menuData[activeMenu]}
                    onLinkClick={() => {
                      setActiveMenu(null)

                    }}
                    loading={loading}
                    pathname={pathname}
                  />
                </div>
              </div>
              {(activeMenu === 'bedroom' || activeMenu === 'megaSale') && (
                <div className="w-full md:w-4/12">
                  <Image
                    className="object-contain p-2"
                    width={500}
                    height={500}
                    src={megamenu}
                    alt="menu"
                  />
                </div>
              )}
            </Container>
          </div>
        )} */}
    </div>
  );
};

export default MenuBar;
