import { bannerData } from '@/data/products';
import React from 'react';

const Catalogue: React.FC = () => {
  const { imageUrl, title, buttonText, fileUrl  } = bannerData; 

  return (
    <section
  className="relative lg:h-screen w-full h-96 flex items-center justify-end bg-cover lg:bg-left bg-center text-white lg:mt-10"
  style={{ backgroundImage: `url(${imageUrl})` }}
>
  
  <div className="absolute inset-0 bg-[#fcfcfc] bg-opacity-10"></div>

  <div className="z-10 text-center transform lg:translate-x-[-60%] translate-x-[-10%] max-w-[90%] md:max-w-[70%]">
    <h2 className="text-3xl md:text-6xl font-extralight mb-8 text-black tracking-[6px]">{title}</h2>
    <a
      href={fileUrl}
      download
      target="_blank"
      rel="noopener noreferrer" 
      className="bg-black text-white font-extralight px-8 md:px-10 py-3 rounded-full tracking-[6px] hover:bg-gray-800 transition text-lg md:text-2xl"
    >
      {buttonText}
    </a>
  </div>
</section>
  );
};

export default Catalogue;
