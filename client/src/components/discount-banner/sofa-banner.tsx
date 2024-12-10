'use client';
import Image from 'next/image';
import sofa1 from '@assets/images/banners/fdsdf.webp';
import banner2 from '@assets/images/banners/efsaefdsfe.jpg';
import banner3 from '@assets/images/banners/freepik__enhance__60779.webp';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton'; // Adjust the path as necessary

const SofaBanner: React.FC = () => {
  const [loading, setLoading] = useState(false);


  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 mt-2 gap-4 relative px-2 md:px-0">
      <div className="bg-lightforeground rounded-r-2xl flex items-center ps-5 xs:px-10 sm:ps-20 2xl:ps-32 min-h-[300px]">
        <div className="w-1/2 xs:w-1/3">
          <div className="space-y-3">
            {loading ? (
              <>
                <Skeleton className="h-6 w-40 rounded-md" />
                <Skeleton className="h-8 w-64 rounded-md" />
                <Skeleton className="h-10 w-36 rounded-full" />
              </>
            ) : (
              <>
                <p className="text-xs sm:text-14 font-normal text-black">
                  Chair
                </p>
                <h3 className="font-semibold text-xl sm:text-2xl mt-1">
                  Marlin Tub
                  <br />
                  Swivel Chair
                </h3>
                <div className="lg:pt-2">
                  <Link
                    href="/product/marlin-tub-swivel-chair-brown-cream"
                    className="bg-black py-2 px-6 rounded-full text-white hover:bg-main"
                  >
                    Buy Now
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="w-1/2 xs:w-2/3 relative">

          {loading ? (
            <Skeleton className="w-full h-full rounded-md" />
          ) : (
            <Image src={sofa1} width={900} height={500} alt="sofa image" className="w-full h-full" />
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 min-h-[600px]">
        <div
          className="w-full h-full rounded-2xl"
          style={{
            backgroundImage: loading ? 'none' : `url(${banner2.src})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
        >
          {loading ? (
            <Skeleton className="w-full h-full rounded-md" />
          ) : (
            <div className='flex justify-center items-center bg-[#0000004d] w-full h-full rounded-2xl'>
              <div className="text-center space-y-3">
                <p className="text-xs sm:text-14 font-normal text-primary-foreground text-white">
                  Home Office
                </p>
                <h3 className="font-semibold text-xl sm:text-2xl mt-1 text-white">
                  Magia Office Desk
                </h3>
                <div className="lg:pt-2">
                  <Link
                    href="/product/magia-office-desk"
                    className="bg-black py-2 px-6 rounded-full text-white hover:bg-main"
                  >
                    Buy Now
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
        <div
          className="w-full h-full rounded-2xl flex justify-center items-center"
          style={{
            backgroundImage: loading ? 'none' : `url(${banner3.src})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
        >
          {loading ? (
            <Skeleton className="w-full h-full rounded-md" />
          ) : (

            <div className='flex justify-center items-center bg-[#0000004d] w-full h-full rounded-2xl'>
              <div className="text-center space-y-3">
                <p className="text-xs sm:text-14 font-normal text-primary-foreground text-white">
                  Bedroom
                </p>
                <h3 className="font-semibold text-xl sm:text-2xl mt-1 text-white">
                  Mila TV Cabinet/TV Stand
                </h3>
                <div className="lg:pt-2">
                  <Link
                    href="/product/mila-tv-cabinettv-stand"
                    className="bg-black py-2 px-6 rounded-full text-white hover:bg-main"
                  >
                    Buy Now
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SofaBanner;
