import Image from 'next/image';
import React from 'react';
import image from '@assets/images/Big image.png';
import TopHero from '@/components/top-hero';
import { wishbredcrumbs } from '@/data/data';
import Container from '@/components/ui/Container';
import { IoCloseSharp } from 'react-icons/io5';
import Counter from '@/components/Counter/Counter';

const Wishlist = () => {
  return (
    <>
      <TopHero breadcrumbs={wishbredcrumbs} />
      <Container className="grid grid-cols-12 gap-3  bg-white shadow my-5 items-center mt-2">
        <div className="col-span-12 md:col-span-4 lg:col-span-4 xl:col-span-5 2xl:col-span-6">
          <div className="flex items-center gap-3">
            <Image
              className="w-[120px] h-[120px]"
              width={300}
              height={300}
              src={image}
              alt="image"
            />
            <div className="space-y-2 py-2 md:py-0">
              <p className="font-medium text-14 lg:text-16">
                Corsica Dining Table - Display Item
              </p>
              <div className="block md:hidden space-y-2">
                <div className=" flex items-center gap-4 ">
                  <p className="font-medium md:font-bold text-12 lg:text-xl xl:text-2xl">
                    AED. <span>3000</span>
                  </p>
                  <p className="font-normal md:font-bold text-10 lg:text-md xl:text-lg line-through text-lightforeground">
                    AED. <span>3000</span>
                  </p>
                  <IoCloseSharp className="cursor-pointer" size={25} />
                </div>
                <div className="flex flex-wrap gap-4 items-center">
                  <Counter />
                  <button className="bg-main px-2 lg:px-4 py-2 rounded-md text-white w-fit">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden md:block md:col-span-3 lg:col-span-3 xl:col-span-2 2xl:col-span-2">
          <Counter />
        </div>
        <div className="hidden md:block md:col-span-3 lg:col-span-3 xl:col-span-3 2xl:col-span-3">
          <div className="flex items-center gap-1 lg:gap-4">
            <p className="font-bold text-14 lg:text-xl xl:text-2xl">
              AED. <span>3000</span>
            </p>
            <p className="font-bold text-12 lg:text-md xl:text-lg line-through text-lightforeground">
              AED. <span>3000</span>
            </p>
            <IoCloseSharp className="cursor-pointer" size={25} />
          </div>
        </div>
        <div className="hidden md:block md:col-span-2 lg:col-span-2 xl:col-span-2 2xl:col-span-1">
          <button className="bg-main px-2 lg:px-4 py-2 rounded-md text-white w-fit">
            Add to Cart
          </button>
        </div>
      </Container>
    </>
  );
};

export default Wishlist;
