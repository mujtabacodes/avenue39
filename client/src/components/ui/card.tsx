// components/Card.tsx

import React from 'react';
import Image from 'next/image';
import { ICard } from '@/types/types';
import { HiOutlineShoppingBag } from "react-icons/hi";
import { MdStar, MdStarBorder } from 'react-icons/md';
import { IoEyeOutline } from 'react-icons/io5';
import { CiHeart } from 'react-icons/ci';


interface CardProps {
  card: ICard;
}

const Card: React.FC<CardProps> = ({ card }) => {

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= card.reviews) {
        stars.push(<MdStar key={i} size={20} className='text-yellow-400' />);
      } else {
        stars.push(<MdStarBorder key={i} size={20} className='text-yellow-400' />);
      }
    }
    return stars;
  };

  return (
    <div className="bg-white rounded-lg text-center relative product-card">
      <div className='bg-white rounded-full absolute top-4 right-8 flex flex-col gap-2 p-2 product-hover-icons z-[1]'>
      <IoEyeOutline size={20} />
      <CiHeart size={20} />
      </div>
      <div className='relative'>
      <span className='absolute top-4 left-4 text-white text-xs font-light bg-red-500 rounded-full w-14 h-6 flex justify-center items-center'>{card.sale}</span>
      <Image src={card.image} alt={card.heading} width={320} height={200} className="object-cover rounded-t-lg" />
      </div>
      <h3 className="text-lg font-semibold mt-2">{card.heading}</h3>
      <p className="text-md font-semibold mt-1">{card.price} <span className='line-through text-secondary-foreground ms-2'>{card.discount}</span></p>
      <div className='flex gap-1 mt-2 items-center justify-center'>
      {renderStars()}
      </div>
      <div className='text-center flex justify-center'>
      <button className="mt-4 px-4 py-2 text-primary border border-primary  rounded-full flex items-center justify-center gap-2 hover:bg-primary hover:text-white">
      <HiOutlineShoppingBag />
        <span className="mr-2">Add to card</span>
      </button>
      </div>
    </div>
  );
};

export default Card;
