'use client';
import TopHero from '@/components/top-hero';
import Container from '@/components/ui/Container';
import { productcetagories, saleitems } from '@/data';
import { productsbredcrumbs } from '@/data/data';
import React, { useEffect, useState } from 'react';
import { Slider, SliderPrimitive } from '@/components/ui/slider';
import Salecard from '@/components/ui/sale-card';
import Image from 'next/image';
import banner5 from '@images/banners/banner5.png';
import banner6 from '@images/banners/banner6.png';
import CounDown from '@/components/countdown/coundown';

const Products = () => {
  const [range, setRange] = useState<[number, number]>([0, 500]);

  const handleValueChange = ([start, end]: [number, number]) => {
    setRange([start, end]);
  };

  const [counter, setCounter] = useState(60);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prevCounter) => (prevCounter > 0 ? prevCounter - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <TopHero breadcrumbs={productsbredcrumbs} />
      <Container className="mt-5 flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/4">
          <h3 className="py-5 text-xl font-medium">Filter</h3>
          <div className="border-t-2 py-6">
            <h4 className="text-xl font-medium mb-5">Categories</h4>
            <div>
              <form
                action=""
                className="flex flex-col gap-3 custom-scroll overflow-y-auto max-h-52"
              >
                {productcetagories.map((item) => (
                  <div className="flex items-center gap-2" key={item.id}>
                    <input
                      type="checkbox"
                      name="filter"
                      id={`Category${item.id}`}
                      className="rounded-none border-1 border-black w-4 h-4"
                    />
                    <label
                      htmlFor={`Category${item.id}`}
                      className="text-16 capitalize"
                    >
                      {item.title}
                    </label>
                    <span className="bg-light px-[2px] font-semibold text-[10px] tracking-tight">
                      {item.totalItems}
                    </span>
                  </div>
                ))}
              </form>
            </div>
          </div>
          <div className="border-t-2 py-6">
            <h4 className="text-xl font-medium mb-5">Prices</h4>
            <div>
              <Slider
                defaultValue={[0, 500]}
                max={500}
                step={1}
                onValueChange={handleValueChange}
              >
                <SliderPrimitive.Thumb />
                <SliderPrimitive.Thumb />
              </Slider>
              <div className="flex justify-between mt-2">
                <span className="text-14 font-medium">Dhs {range[0]}</span>
                <span className="text-14 font-medium">Dhs {range[1]}</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-2xl font-semibold mb-5">Pay Your Way</h4>
            <div className="flex justify-center gap-4 px-2">
              {saleitems.map((item) => (
                <Salecard key={item.id} cards={item} />
              ))}
            </div>
            <div className="mt-7">
              <Image src={banner5} alt="sale banner" />
            </div>
          </div>
        </div>
        <div className="w-full md:w-3/4">
          <div
            className="w-full h-[437px] px-9 py-12 flex items-center"
            style={{
              backgroundImage: `url(${banner6.src})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}
          >
            <div>
              <p className="text-white text-xs">Get Discount Up to 50%</p>
              <h1 className="text-red-600 text-7xl font-bold">
                Mega <span className="font-medium">Sale</span>
              </h1>
              <p className="text-white text-sm mt-4 max-w-80">
                Get up to 50% off for this weak and get offer. Don't miss this
                chance!
              </p>
              <div className='mt-7'>
              <CounDown />
              </div>
              <p className='text-white mt-4 text-17 tracking-widest font-light'>BUY NOW PAY LATER</p>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Products;
