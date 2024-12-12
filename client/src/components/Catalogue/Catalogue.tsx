import { bannerData } from '@/data/products';
import Image from 'next/image';
import React from 'react';

const Catalogue: React.FC = () => {
  const { imageUrl, title, buttonText, fileUrl  } = bannerData; 

  return (
//     <section
//   className=" lg:h-screen w-full h-96 flex items-center justify-end bg-cover lg:bg-left bg-center text-white lg:mt-10"
//   style={{ backgroundImage: `url(${imageUrl})` }}
// >
  
//   <div className=" bg-[#fcfcfc] bg-opacity-10"></div>

//   <div className="z-10 text-center transform lg:translate-x-[-60%] translate-x-[-10%] max-w-[90%] md:max-w-[70%]">
//     <h2 className="text-3xl md:text-6xl font-extralight mb-8 text-black tracking-[6px]">{title}</h2>
//     <a
//       href={fileUrl}
//       download
//       target="_blank"
//       rel="noopener noreferrer" 
//       className="bg-black text-white font-extralight px-8 md:px-10 py-3 rounded-full tracking-[6px] hover:bg-gray-800 transition text-lg md:text-2xl"
//     >
//       {buttonText}
//     </a>
//   </div>



// </section>

<section className='flex items-center lg:justify-start md:justify-start sm:justify-start justify-center gap-4 md:flex-nowrap flex-wrap w-full bg-[#E2E3E5] h-full lg:pb-0 pb-8'>

<div className='lg:w-[65%] md:w-[50%] object-fill'>
<Image src={imageUrl} className='w-full h-[80vh] object-contain p-8'  alt='categlog' width={1200} height={1200} quality={100}/>

</div>


<div className='lg:w-fit flex flex-col items-center justify-center h-full md:w-fit w-[50%] lg:m-0 m-auto'>
<div className="w-full flex flex-col items-center justify-center h-full ">
   <h2 className="md:text-3xl text-3xl lg:text-6xl font-extralight lg:mb-8 mb-4 text-black tracking-[6px]">{title}</h2> 
   <a
      href={fileUrl}
      download
      target="_blank"
      rel="noopener noreferrer" 
      className="bg-black text-white font-extralight px-8 md:px-10 py-2 rounded-full tracking-[6px] hover:bg-gray-800 transition text-lg md:text-xl"
    >
      {buttonText}
    </a>
  </div>

</div>


</section>





  );
};

export default Catalogue;
