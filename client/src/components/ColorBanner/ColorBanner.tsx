import { ColorBannerData } from '@/data/products';
import React from 'react';

const ColorBanner: React.FC = () => {
  const { imageUrl, ShortText, TopTitle, Description,Heading  } = ColorBannerData; 

  return (
    <section
  className="relative lg:h-[700px] h-72 flex lg:items-center justify-start bg-no-repeat bg-contain lg:bg-left bg-bottom text-white "
  style={{ backgroundImage: `url(${imageUrl})` }}
><div className="absolute inset-0 bg-black bg-opacity-5"></div>

  <div className='float-start '>
  <div className="z-10 text-center transform  lg:pt-0 pt-3 lg:translate-x-[10%] lg:max-w-[50%] md:max-w-[50%] px-10 ">
    <p className="text-14 font-normal pb-2  text-black ">{TopTitle}</p>
    <p className="text-20 font-semibold pb-1   text-black ">{Heading}</p>
    <p className="text-10 font-normal pb-2  text-black ">{ShortText}</p>
    <p className="text-13 font-normal pb-2  text-black ">{Description}</p>

  </div>
  </div>
</section>
  );
};

export default ColorBanner;
