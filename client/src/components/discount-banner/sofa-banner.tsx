'use client';
import Image from 'next/image';
import sofa1 from '@assets/images/banners/ddddd.png';
import banner2 from '@assets/images/banners/banner2.png';
import banner3 from '@assets/images/banners/banner3.png';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton'; // Adjust the path as necessary

const SofaBanner: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for 4 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000);

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, []);

  const handleBuyNowClick = () => {
    router.push('/checkout');
  };

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
                <p className="text-xs sm:text-14 font-normal text-primary-foreground">
                  Get Discount Up to 80%
                </p>
                <h3 className="font-semibold text-xl sm:text-2xl mt-1">
                  White Minimalist<br />Combo Sofa
                </h3>
                <div className="lg:pt-6">
                  <Link
                    href="/products"
                    className="bg-black py-2 px-6 rounded-full text-white hover:bg-white hover:text-black"
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
            <Image src={sofa1} alt="sofa image" className="w-full h-full" />
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 min-h-[600px]">
        {[banner2, banner3].map((banner, index) => (
          <div
            key={index}
            className="w-full h-full rounded-2xl flex justify-center items-center"
            style={{
              backgroundImage: loading ? 'none' : `url(${banner.src})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}
          >
            {loading ? (
              <Skeleton className="w-full h-full rounded-md" />
            ) : (
              <div className="text-center space-y-3">
                <p className="text-xs sm:text-14 font-normal text-primary-foreground text-white">
                  Get Discount Up to 80%
                </p>
                <h3 className="font-semibold text-xl sm:text-2xl mt-1 text-white">
                  White Minimalist Combo Sofa
                </h3>
                <div className="lg:pt-3">
                  <Link
                    href="/product/5"
                    className="bg-white py-2 px-6 rounded-full text-black hover:bg-black hover:text-white"
                  >
                    Buy Now
                  </Link>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default SofaBanner;
