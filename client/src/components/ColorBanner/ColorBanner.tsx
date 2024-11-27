import { ColorBannerData } from '@/data/products';
import Image from 'next/image';
import React from 'react';
import Container from '../ui/Container';

const ColorBanner: React.FC = () => {
  const { imageUrl, ShortText, TopTitle, Description, Heading,imageUrl2 } = ColorBannerData;

  return (
    <div className='bg-[#EBEBEB]'>
    <Container >
    <section className="flex flex-col lg:flex-row items-end justify-center h-auto text-black py-10">
     
      <div className="flex flex-col justify-center items-center lg:w-[30%] w-full pb-2 text-center mx-auto">
      <div className='px-14'>
      <p className="text-lg font-medium pb-1 ">{TopTitle}</p>
        <h2 className="text-2xl font-semibold pb-1 ">{Heading}</h2>
        <p className="text-sm font-normal pb-2">{ShortText}</p>
        <p className="text-18 font-extralight">{Description}</p>
      </div>
        <div className="w-fit lg:h-full lg:mt-20 md:mt-10 mt-10"  >
        <Image src={imageUrl2} className='w-full h-auto object-cover'  alt='categlog' width={1200} height={1200} quality={100}/>        
      </div>
      </div>

    
      <div className="lg:w-[70%] w-full h-full rounded-2xl">   
        <Image src={imageUrl} className='w-full h-auto object-cover rounded-[3rem]'  alt='categlog' width={1200} height={1200} quality={100}/>        
      </div>
    </section>
    </Container>
    </div>
  );
};

export default ColorBanner;
