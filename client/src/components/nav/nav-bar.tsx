import { INav } from '@/types/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaRegUser, FaShoppingCart, FaUser } from 'react-icons/fa';
import logo from '../../../public/assets/logo.png';
import { IoBagOutline, IoSearchSharp } from 'react-icons/io5';
import Container from '../ui/Container';

const Navbar = (props: INav) => {
  return (
    <div className="">
      <Container className="flex items-center justify-between p-4 gap-10">
        <div className="w-2/12">
          <Image className='' width={200} height={200} src={logo} alt="Logo" />
        </div>
        <div className="w-6/12 ">
          <div className="relative rounded-md">
            <input
              type="text"
              className="py-4 px-4 pe-11 border block w-full text-sm disabled:opacity-50 "
              placeholder="Search Here..."
            />
            <div className="absolute inset-y-0 end-0 flex items-center z-20 pe-4 cursor-pointer">
              <IoSearchSharp className="cursor-pointer" size={30} />
            </div>
          </div>
        </div>
        <div className="w-4/12 gap-4 flex justify-between items-center">
          <div className="bg-red-600 w-16 h-12 rounded-3xl relative flex justify-center items-center text-white">
            <IoBagOutline size={25} />
            <div className="w-5 h-5 rounded-full bg-black flex justify-center items-center absolute top-2 right-2 text-xs">
              12
            </div>
          </div>
          <div className="flex gap-8">
            <Link className="gap-2 flex items-center text-14 hover:underline" href={'/'}>
              <FaRegUser size={25} />
              Login/Register
            </Link>
            <Link className="text-14 hover:underline" href={'/'}>
              About us
            </Link>
            <Link className="text-14 hover:underline" href={'/'}>
              Contact Us
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
