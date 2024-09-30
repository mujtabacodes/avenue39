'use client';
import { ISaleItems } from '@/types/types';
import Image from 'next/image';
import React from 'react';
import { Button } from './button';
import { useRouter } from 'next/navigation';
import { Inder } from 'next/font/google';

interface CardProps {
  cards: ISaleItems;
}

const Salecard: React.FC<CardProps> = ({ cards }) => {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push('/products');
  };

  return (
    <div className="px-6 lg:w-2/4 py-2 rounded-lg border-2 border-primary-foreground bg-white text-center">
    <div className={` rounded-lg px-2 ${cards.id === 1 ?"bg-gradient-to-r from-blue-300 via-orange-300 to-pink-300":"bg-[#00FFBC]"}`}>
    <Image
        src={cards.imageUrl}
        alt="sa"
        width={200}
        height={200}
        className="h-10 object-contain mx-auto"
      />
    </div>
      <p className="text-[10px] font-semibold">{cards.para}</p>
      <Button
        className="rounded-full text-white text-[10px] h-7 mt-2 border"
        onClick={handleButtonClick}
      >
        {cards.btnText}
      </Button>
    </div>
  );
};

export default Salecard;
