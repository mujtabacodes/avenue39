import { INav } from '@/types/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaRegHeart, FaRegUser, FaShoppingCart, FaUser } from 'react-icons/fa';
import logo from '@icons/logo.png';
import { IoBagOutline, IoSearchSharp } from 'react-icons/io5';
import Container from '../ui/Container';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

import { HiOutlineBars3BottomRight } from 'react-icons/hi2';
import StarRating from '../ui/star';
import SocialLink from '../social-link';

const Navbar = (props: INav) => {
  return (
    <>
      <Container className="flex items-center justify-between p-2 md:p-4 gap-4">
        <div className="w-4/12 md:w-2/12">
          <Link href={"/"}><Image className="" width={250} height={250} src={logo} alt="Logo" /></Link>
        </div>
        <div className="w-0/12 md:w-4/12 lg:w-5/12 ">
              <div className="relative rounded-md hidden md:block">
                <input
                  type="text"
                  className="py-4 px-4 pe-11 border block w-full text-sm disabled:opacity-50 "
                  placeholder="Search Here..."
                />
          <Drawer>
            <DrawerTrigger asChild>
                <div className="absolute inset-y-0 end-0 flex items-center z-20 pe-4 cursor-pointer">
                  <IoSearchSharp className="cursor-pointer" size={30} />
                </div>
            </DrawerTrigger>
            <DrawerContent>
              <div className='max-w-screen-lg w-full mx-auto mt-10 space-y-5 p-2'>
              <div className="relative rounded-md w-full">
                <input
                  type="text"
                  className="py-4 px-4 pe-11 border block w-full text-sm disabled:opacity-50 "
                  placeholder="Search Here..."
                />
                <div className="absolute inset-y-0 end-0 flex items-center z-20 pe-4 cursor-pointer">
                  <IoSearchSharp className="cursor-pointer" size={30} />
                </div>
              </div>
              <div className='border p-2 max-h-[600px] overflow-y-auto custom-scrollbar '>
                  <div className='flex border p-2 rounded-md bg-white hover:shadow-md transition duration-300 gap-2 mt-2'>
                    <Image width={100} height={100} src={"/assets/search.png"} alt='search' />
                    <div className='pt-1'>
                      <p className='text-21 font-normal'>Sparta Coffee Table</p>
                      <div className='flex items-center gap-4'>
                      <p className='text-15 font-semibold'>Dhs. <span>150</span>.00</p>
                      <p className='text-[12px] text-primary-foreground font-bold line-through'><span>150</span>.00</p>
                      </div>
                        <StarRating defaultValue={5} disabled  />
                    </div>
                  </div>
                  
              </div>
              </div>
            </DrawerContent>
          </Drawer>
              </div>
        </div>
        <div className=' md:w-2/12 lg:w-1/12 hidden md:flex justify-center'>
        <div className="bg-red-600 lg:w-14 w-12 h-10 lg:h-12 rounded-3xl relative flex justify-center items-center text-white">
            <IoBagOutline size={25} />
            <div className="w-5 h-5 rounded-full bg-black flex justify-center items-center absolute top-2 right-2 text-xs">
              10
            </div>
          </div>
        </div>
        <div className="w-5/12 md:w-5/12 lg:w-3/12 gap-2 flex justify-end items-center ">
        <Drawer>
            <DrawerTrigger asChild>
                  <IoSearchSharp
                  className="cursor-pointer block md:hidden "
                  size={30}
                />
            </DrawerTrigger>
            <DrawerContent>
              <div className='max-w-screen-lg w-full mx-auto mt-10 space-y-5 p-2'>
              <div className="relative rounded-md w-full">
                <input
                  type="text"
                  className="py-4 px-4 pe-11 border block w-full text-sm disabled:opacity-50 "
                  placeholder="Search Here..."
                />
                <div className="absolute inset-y-0 end-0 flex items-center z-20 pe-4 cursor-pointer">
                  <IoSearchSharp className="cursor-pointer" size={30} />
                </div>
              </div>
              <div className='border p-2 max-h-[600px] overflow-y-auto custom-scrollbar '>
                  <div className='flex border p-2 rounded-md bg-white hover:shadow-md transition duration-300 gap-2 mt-2'>
                    <Image width={100} height={100} src={"/assets/search.png"} alt='search' />
                    <div className='pt-1'>
                      <p className='text-21 font-normal'>Sparta Coffee Table</p>
                      <div className='flex items-center gap-4'>
                      <p className='text-15 font-semibold'>Dhs. <span>150</span>.00</p>
                      <p className='text-[12px] text-primary-foreground font-bold line-through'><span>150</span>.00</p>
                      </div>
                        <StarRating defaultValue={5} disabled  />
                    </div>
                  </div>
                  
              </div>
              </div>
            </DrawerContent>
          </Drawer>
        
         
         
          <div className="hidden md:flex gap-10 items-center">
            <Link
              className="gap-2 flex items-center text-14 font-semibold hover:underline"
              href={'/login'}
            >
              <FaRegUser size={25} />
              <span>Login</span>
            </Link>
            <Link className="text-14 font-semibold hover:underline" href={'/about'}>
              About us
            </Link>
            <Link className="text-14 font-semibold hover:underline" href={'/contact'}>
              Contact Us
            </Link>
          </div>

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <HiOutlineBars3BottomRight
                  className="p-2 bg-black text-white rounded-lg"
                  size={40}
                />
              </SheetTrigger>
              <SheetContent className="pb-5">
                <div className="grid mt-10 space-y-2">
                  <Link className="text-16 font-semibold hover:underline" href={'/about'}>
                    About us
                  </Link>
                  <Link className="text-16 font-semibold hover:underline" href={'/contact'}>
                    Contact Us
                  </Link>
                  <Link
                    className="gap-2 flex items-center text-16 font-semibold hover:underline"
                    href={'/login'}
                  >
                    Login/Register
                  </Link>
                  <SocialLink className={"gap-2 pt-2"} linkClass='p-2 border rounded-md' />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </Container>
      
    </>
  );
};

export default Navbar;
