'use client';
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Card from '../ui/card';
import { StaticImageData } from 'next/image';
import Container from '../ui/Container';
import CustomPrevArrow from './custom-prev-arrow';
import CustomNextArrow from './custom-next-arrow';

interface SliderProps {
  slideritems: Array<{
    id: number;
    image: StaticImageData;
    heading: string;
    price: string;
    discount?: string;
    sale: string;
    reviews: number;
  }>;
}

const settings = {
  arrows: true,
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 4,
  speed: 500,
  rows: 2,
  slidesPerRow: 1,
  prevArrow: <CustomPrevArrow />,
  nextArrow: <CustomNextArrow />,
  responsive: [
    {
      breakpoint: 1025,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        rows: 2,
        slidesPerRow: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        rows: 1,
        slidesPerRow: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        rows: 1,
        slidesPerRow: 1,
      },
    },
  ],
};

const HotProductSlider: React.FC<SliderProps> = ({ slideritems }) => {
  return (
    <section className="mt-4">
      <Container className="slider-container w-full">
        <h2 className="text-2xl xs:text-3xl mb-3 font-semibold">Hot Newest Products</h2>
        <Slider {...settings} className='mx-4 xs:mx-0 hot-products'>
          {slideritems.map((card) => (
            <div key={card.id}>
              <Card card={card} />
            </div>
          ))}
        </Slider>
      </Container>
    </section>
  );
};

export default HotProductSlider;
