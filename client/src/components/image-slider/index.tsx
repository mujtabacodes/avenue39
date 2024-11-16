'use client';

import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';
import Link from 'next/link';

interface Image {
  imageUrl: string;
  src: string;
  alt: string;
  link: string;
  
}

interface CustomPagingProps {
  images: Image[];
  setting: object;
  className?: string;
  sliderBgClass?: string;
  imageBgClass?: string;
}

const CustomPaging: React.FC<CustomPagingProps> = ({
  images,
  setting,
  className,
  sliderBgClass,
  imageBgClass,
}) => {
  const settings = {
    customPaging: (i: number) => {
      const image = images[i];
      return (
        <a className="bg-orange-600">
          <Image
            src={image.imageUrl}
            alt={`Thumbnail ${i + 1}`}
            width={100}
            height={100}
            objectFit="cover"
            quality={100}
          />
        </a>
      );
    },
    dots: true,
    dotsClass: 'slick-dots slick-thumb',
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    ...setting,
    responsive: [
      {
        breakpoint: 1024, 
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, 
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className={`h-80 w-full ${className}`}>
      <Slider {...settings} className={sliderBgClass}>
        {images?.map((img, index) => (
          <div key={index} className={imageBgClass}>
            <Link href={img.link}>
            <Image
              src={img.imageUrl}
              alt={`Image ${index + 1}`}
              width={600} 
              height={600} 
              className="object-cover"
            />
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CustomPaging;
