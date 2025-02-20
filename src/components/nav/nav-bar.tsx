'use client';
import { IProduct } from '@/types/types';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import logo from '@icons/logo_nav.png';
import {
  IoCloseOutline,
  IoSearchOutline,
  IoSearchSharp,
} from 'react-icons/io5';
import Container from '../ui/Container';
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose,
} from '@/components/ui/drawer';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import CartItems from '../cart/items';
import { Popover } from 'antd';
import { useSelector } from 'react-redux';
import { State } from '@/redux/store';
import { useQuery } from '@tanstack/react-query';
import { ChangeUrlHandler, fetchProducts } from '@/config/fetch';
import RenderStars from '../ui/renderstars';
import { Skeleton } from '../ui/skeleton';
import Wishlist from '../wishlist/wishlist';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { loggedInUserAction } from '@redux/slices/user/userSlice';
import { useAppDispatch } from '@components/Others/HelperRedux';
import { CiUser } from 'react-icons/ci';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const Navigate = useRouter();
  const [isSticky, setIsSticky] = useState<boolean>(false);
  const drawerInputRef = useRef<HTMLInputElement>(null);
  const userDetails = useSelector(
    (state: State) => state.usrSlice.loggedInUser,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const {
    data: productsData,
    error,
    isLoading,
  } = useQuery<IProduct[], Error>({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });
  const [isProductListOpen, setIsProductListOpen] = useState(false);

  const { loggedInUser } = useSelector((state: State) => state.usrSlice);

  const [profilePhoto, setProfilePhoto] = useState<any>([]);
  useEffect(() => {
    if (loggedInUser) {
      setProfilePhoto({
        imageUrl: loggedInUser?.userImageUrl,
        public_id: loggedInUser.userPublicId,
      });
    }
  }, [loggedInUser]);

  const products = productsData || [];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleNavigation = (product:IProduct) => {
    let url =  ChangeUrlHandler(product)
    Navigate.push(url);
    setIsProductListOpen(false);
  };

  const filteredProducts = products?.filter((product: IProduct) => {
    const searchTerm = searchText.trim().toLowerCase();

    return (
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.price.toString().includes(searchTerm) ||
      product.discountPrice.toString().includes(searchTerm) ||
      (product.colors &&
        product.colors.some((color: string) =>
          color.toLowerCase().includes(searchTerm),
        )) ||
      (product.spacification &&
        product.spacification.some((spec) =>
          Object.values(spec).some((value) =>
            value.toString().toLowerCase().includes(searchTerm),
          ),
        )) ||
      product.additionalInformation.some((info) =>
        Object.values(info).some((value) =>
          value.toString().toLowerCase().includes(searchTerm),
        ),
      ) ||
      (product.categories &&
        product.categories.some((category) =>
          category.name.toLowerCase().includes(searchTerm),
        )) ||
      (product.subcategories &&
        product.subcategories.some((subcategory) =>
          subcategory.name.toLowerCase().includes(searchTerm),
        ))
    );
  });

  useEffect(() => {
    if (drawerInputRef.current) {
      setTimeout(() => {
        drawerInputRef.current?.focus();
      }, 50);
    } else {
      setTimeout(() => {
        drawerInputRef.current?.focus();
      }, 50);
    }
  }, []);

  const logoutHhandler = () => {
    try {
      Cookies.remove('user_token', { path: '/' });

      dispatch(loggedInUserAction(null));

      Navigate.push('/login');
      setOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className={`bg-white dark:text-black ${isSticky ? 'sticky top-0 z-[199]' : ''}`}
    >
      <Container className="flex items-center justify-between p-2 md:p-4 gap-4 dark:bg-white ">
        <div className="w-3/12 min-w-24">
          <div className="w-fit">
            <Link className="relative" href={'/'}>
              <Image
                className="object-contain"
                width={180}
                height={180}
                src={logo}
                alt="Logo"
              />
            </Link>
          </div>
        </div>
        <div className="w-full max-w-[35%] lg:max-w-[58%] xl:max-w-[43%] 2xl:max-w-[40%] 2xl:mr-[40px]">
          <div className="bg-whtie">
            <form
              className="relative w-full md:block hidden bg-white z-[1099]"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="text"
                name="header-search"
                value={searchText}
                onChange={handleInputChange}
                onClick={() => setIsProductListOpen(true)}
                className="h-[40px] border focus-visible:outline-none focus-visible:ring-0 block w-full rounded-full custom-input-bg pl-12 z-[199] border-[#afa183] border-opacity-30 font-extralight"
                placeholder="Search Here..."
              />
              <button
                type="submit"
                className="absolute inset-y-0 left-0 flex items-center z-20 pl-4 cursor-pointer"
              >
                <IoSearchOutline
                  className="cursor-pointer font-extralight text-[#A6A6A6]"
                  size={18}
                />
              </button>

              {isProductListOpen && (
                <>
                  <div className="absolute top-full w-full p-3 bg-white border border-[#afa183] border-opacity-30 rounded-t-2xl mt-2 max-h-[600px] overflow-y-auto custom-scrollbar z-[999]">
                    <div className="flex justify-end mb-2 sticky top-0">
                      <IoCloseOutline
                        size={24}
                        className="cursor-pointer bg-gray-400 rounded-full text-white p-1 "
                        onClick={() => setIsProductListOpen(false)}
                      />
                    </div>
                    {filteredProducts.length > 0 ? (
                      filteredProducts.map((product) => (
                        <div
                          key={product.id}
                          onClick={() => handleNavigation(product)}
                          className="flex border p-2 my-2 rounded-md bg-white hover:shadow-md transition duration-300 gap-2 cursor-pointer border-[#afa183] border-opacity-30"
                        >
                          <Image
                            width={100}
                            height={100}
                            src={product.posterImageUrl}
                            alt={product.name}
                            className="min-h-[100px] min-w-[100px]"
                          />
                          <div className="pt-1 flex flex-col gap-2">
                            <p className="text-18 xsm:text-21 font-normal capitalize">
                              {product.name}
                            </p>
                            <div className="flex items-center gap-4">
                              {product.discountPrice > 0 ? (
                                <>
                                  <p className="text-15 font-semibold">
                                    AED <span>{product.discountPrice}</span>
                                  </p>
                                  <p className="text-[12px] text-primary-foreground font-bold line-through">
                                    AED <span>{product.price}</span>
                                  </p>
                                </>
                              ) : (
                                <p className="text-15 font-semibold">
                                  AED <span>{product.price}</span>
                                </p>
                              )}
                            </div>
                            <RenderStars card={product} />
                          </div>
                        </div>
                      ))
                    ) : (
                      <div>No product is found</div>
                    )}
                  </div>
                  <div
                    onClick={() => setIsProductListOpen(false)}
                    className="fixed inset-0 bg-black bg-opacity-0"
                  ></div>
                </>
              )}
            </form>
          </div>
        </div>
        <div className="gap-3 lg:gap-3 flex justify-end items-center w-2/12 ps-2">
          <div className="hidden md:flex justify-between gap-1 lg:gap-1 items-center relative">
            <Wishlist />
            <CartItems />
          </div>
          <div className="hidden md:flex gap-5 items-center">
            {!userDetails ? (
              <Link
                className="gap-2 flex items-center text-14 font-extralight hover:underline text-black dark:text-black"
                href={'/login'}
              >
                <CiUser size={26} />
              </Link>
            ) : (
              <Popover
                content={
                  <div className="flex flex-col gap-2 w-auto px-5 ">
                    <Link
                      className="text-black hover:text-primary"
                      href="/profile"
                      onClick={() => setOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      className="text-black hover:text-primary"
                      href="/order-history"
                      onClick={() => setOpen(false)}
                    >
                      Order History
                    </Link>
                    <Link
                      className="text-black hover:text-primary"
                      href="/login"
                      onClick={() => logoutHhandler()}
                    >
                      Logout
                    </Link>
                  </div>
                }
                title=""
                placement="bottomRight"
                trigger="click"
                open={open}
                onOpenChange={setOpen}
              >
                <div className="flex gap-2 items-center whitespace-nowrap cursor-pointer">
                  <span className="w-auto">
                    <div className="h-14 w-14 rounded-full overflow-hidden">
                      <Image
                        src={
                          profilePhoto && profilePhoto.imageUrl
                            ? profilePhoto.imageUrl
                            : '/images/dummy-avatar.jpg'
                        }
                        width={55}
                        height={55}
                        alt={loggedInUser.name}
                      />
                    </div>
                  </span>
                  <span className="max-w-28 w-auto text-wrap">
                    {userDetails.name}
                  </span>
                </div>
              </Popover>
            )}
          </div>
          <div className="md:hidden flex gap-2 items-center">
            <form onSubmit={(e) => e.preventDefault()}>
              <Drawer direction="top">
                <DrawerTrigger asChild>
                  <button
                    type="submit"
                    className="cursor-pointer block md:hidden"
                  >
                    <IoSearchSharp className="cursor-pointer" size={30} />
                  </button>
                </DrawerTrigger>
                <DrawerContent>
                  <VisuallyHidden>
                    <DrawerTitle>Navbar</DrawerTitle>
                  </VisuallyHidden>
                  <div className="max-w-screen-lg w-full mx-auto m-2 space-y-5 p-2">
                    <DrawerClose asChild>
                      <IoCloseOutline
                        size={24}
                        className="cursor-pointer bg-gray-400 rounded-full text-white p-1 absolute top-2 right-2 z-50 shadow-md hover:bg-gray-500 transition duration-300"
                      />
                    </DrawerClose>
                    <div className="relative rounded-md w-full">
                      <input
                        type="text"
                        value={searchText}
                        onChange={handleInputChange}
                        className="py-4 px-4 pe-11 border block w-full rounded-full text-sm disabled:opacity-50 "
                        placeholder="Search Here..."
                      />
                      <button
                        type="submit"
                        className="absolute inset-y-0 end-0 flex items-center z-20 pe-4 cursor-pointer"
                      >
                        <IoSearchSharp className="cursor-pointer" size={30} />
                      </button>
                    </div>
                    {isLoading && (
                      <div className="border p-2">
                        <div className="flex border p-2 rounded-md bg-white hover:shadow-md transition duration-300 gap-2 mt-2 items-center">
                          <Skeleton className="w-[100px] h-[100px]"></Skeleton>
                          <div className="pt-1 flex flex-col gap-3">
                            <Skeleton className="w-40 h-6 rounded-none"></Skeleton>
                            <Skeleton className="w-40 h-4 rounded-none"></Skeleton>
                            <Skeleton className="w-40 h-4 rounded-none"></Skeleton>
                          </div>
                        </div>
                      </div>
                    )}
                    {error && (
                      <div>Error fetching products: {error.message}</div>
                    )}
                    {!isLoading && !error && filteredProducts.length > 0 && (
                      <div className=" p-2 max-h-[600px] overflow-y-auto custom-scrollbar">
                        <div className="flex flex-wrap justify-center gap-2 -m-2">
                          {filteredProducts.map((product: IProduct) => (
                            <DrawerTrigger asChild key={product.id}>
                              <div
                                onClick={() => handleNavigation(product)}
                                className="flex border p-2 rounded-md flex-col hover:shadow-md items-center transition duration-300 gap-2 w-[48%] mt-2 cursor-pointer bg-white"
                              >
                                <Image
                                  width={100}
                                  height={100}
                                  src={product.posterImageUrl}
                                  alt={product.name}
                                  className="min-h-[100px] min-w-[150px]"
                                />
                                <div className="flex flex-col gap-2">
                                  <p className="text-16 font-normal capitalize">
                                    {product.name}
                                  </p>
                                  <div className="flex items-center gap-4">
                                    <p className="text-15 font-semibold">
                                      AED <span>{product.price}</span>
                                    </p>
                                    <p className="text-[12px] text-primary-foreground font-bold line-through">
                                      <span>{product.discountPrice}</span>
                                    </p>
                                  </div>
                                  <div>
                                    <RenderStars card={product} />
                                  </div>
                                </div>
                              </div>


                            </DrawerTrigger>
                          ))}
                        </div>
                      </div>
                    )}
                    {filteredProducts.length < 1 && (
                      <div>No product is found</div>
                    )}
                  </div>
                </DrawerContent>
              </Drawer>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
