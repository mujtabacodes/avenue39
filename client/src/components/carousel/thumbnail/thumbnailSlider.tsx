import React, { useRef, useEffect } from 'react';
import Slider from 'react-slick';
import { FaSortDown } from 'react-icons/fa';
import Image from 'next/image';

const CustomThumbnailSlickSlider = ({
   thumbs,
   isZoom,
   onSlideChange,
   currentSlideIndex
}: {
   thumbs: { imageUrl: string; altText: string }[];
   isZoom: boolean;
   /* eslint-disable */
   onSlideChange: (index: number) => void;
   /* eslint-enable */
   currentSlideIndex?: number;
}) => {
   const slickRef = useRef<Slider | null>(null);  
   const settings = {
      infinite: thumbs.length < 2 ? false :  true,
      centerMode: true,
      centerPadding: "0",
      slidesToShow: 1,
      speed: 500,
      focusOnSelect: true,
      vertical: true,
      verticalSwiping: true,
      arrows: thumbs.length < 2 ? false :  true,
      nextArrow: <div id="nextArrow" className="slick-next-arrow"><FaSortDown size={25} className="text-black" /></div>,
      responsive: [
         {
            breakpoint: 895,
            settings: {
               slidesToShow: 4,
               centerMode: true,
               vertical: false,
               infinite: thumbs.length < 2 ? false :  true,
            },
         },
         {
            breakpoint: 640,
            settings: {
               slidesToShow: 3,
               centerMode: true,
               vertical: false,
               infinite: thumbs.length < 2 ? false :  true,
            },
         },
         {
            breakpoint: 500,
            settings: {
               slidesToShow: 2,
               centerMode: true,
               vertical: false,
               infinite: thumbs.length < 2 ? false :  true,
            },
         },
      ],
      beforeChange: (_: number, next: number) => {
         onSlideChange(next);
      }
   };

   useEffect(() => {
      if (slickRef.current && currentSlideIndex !== undefined) {
         slickRef.current.slickGoTo(currentSlideIndex);
      }
   }, [currentSlideIndex]);

   return (
      <div className="w-full md:w-3/12 lg:w-1/5 h-fit max-h-[300px] xs:max-h-[355px] sm:max-h-[550px] md:max-h-[400px] lg:max-h-[520px] xl:max-h-[420px] 2xl:max-h-[590px] 3xl:max-h-[650px]">
         <Slider 
            ref={slickRef}
            {...settings} 
            className="product-slider custom-Slick"
         >
            {thumbs.map((thumb, index) => (
               <div key={index} className="column-swiper-slider swiper-slide xsm:mx-0 mx-2">
                  <Image
                     className={`rounded-lg shadow-md aspect-square ${isZoom ? 'md:h-[120px] 2xl:h-[160px] md:w-[120px] 2xl:w-[160px]' : 'h-[130px] w-[130px]'}`}
                     src={thumb.imageUrl || '/default-image.jpg'}
                     width={150}
                     height={150}
                     alt={thumb.altText || 'Thumbnail'}
                  />
               </div>
            ))}
         </Slider>
      </div>
   );
};

export default CustomThumbnailSlickSlider;
