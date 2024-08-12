"use client";

import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { MdStar, MdStarBorder } from 'react-icons/md';

interface Product {
    link: string;
    image: any;
    name: string;
    price: number;
    originalPrice?: number;
    discount?: string;
    rating: number;
}

interface SideCardProps {
    data: Product[];
}

const SideCard: React.FC<SideCardProps> = ({ data }) => {

  const renderStars = ({ star = 0 }: { star?: number }) => {
    const stars = [];
    const maxStars = 5;
    for (let i = 1; i <= maxStars; i++) {
      if (i <= star) {
        stars.push(<MdStar key={i} size={15} className="text-warning" />);
      } else {
        stars.push(<MdStarBorder key={i} size={15} className="text-warning" />);
      }
    }
    return stars;
  };

  const productId = 5;

  return (
    <div className='mt-7 flex flex-col gap-7'>
      {data.map((item, index) => (
        <Link href={`/product/${productId}`} key={index} className='flex gap-4 items-center'>
          <div className='w-1/2 min-w-32'>
            <Image src={item.image} alt={item.name} className='w-44 h-44' />
          </div>
          <div className='flex flex-col gap-3 w-1/2'>
            <p className='text-[13px] font-semibold'>{item.name}</p>
            <hr/>
            <p className='text-[12px] font-semibold'>Dhs. {item.price.toFixed(2)}</p>
            {item.originalPrice && (
              <p className='text-9 font-semibold line-through text-[#A5A5A5]'>Dhs. {item.originalPrice.toFixed(2)}</p>
            )}
            {item.discount && (
              <div className='bg-[#FF0000] w-10 h-5 text-[8px] rounded-3xl text-white flex justify-center items-center'>
                {item.discount}
              </div>
            )}
            <div className='flex'>
              {renderStars({ star: item.rating })}
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default SideCard;
