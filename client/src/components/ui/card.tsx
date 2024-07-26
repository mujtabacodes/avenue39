// components/Card.tsx

import React from 'react';
import Image from 'next/image';
import { Card } from '@/types/types';
import { HiOutlineShoppingBag } from "react-icons/hi";



interface CardProps {
  card: Card;
}

const Card: React.FC<CardProps> = ({ card }) => {
  return (
   <div className='text-center'>
     <div className="bg-white rounded-lg text-center">
      <Image src={card.image} alt={card.heading} width={320} height={200} className="object-cover rounded-t-lg" />
     <div>
     <h3 className="text-lg font-semibold mt-2">{card.heading}</h3>
      <p className="text-md font-semibold mt-1">{card.price}</p>
      <div className='text-center flex justify-center'>
      <button className="mt-4 px-4 py-2 text-primary border border-primary  rounded-full flex items-center justify-center gap-2 hover:bg-primary hover:text-white">
      <HiOutlineShoppingBag />
        <span className="mr-2">Add to card</span>
      </button>
      </div>
     </div>
    </div>
   </div>
  );
};

export default Card;
