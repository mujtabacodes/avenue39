'use client'

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SliderSettings, Slide } from "../../types/types";
import { LiaSlidersHSolid } from "react-icons/lia";

const settings: SliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const slides: Slide[] = [
  {
    image: "/images/slide1.jpg",
    text: "Slide 1 Text",
    buttonText: "Learn More",
    buttonLink: "#",
  },
  {
    image: "/images/slide2.jpg",
    text: "Slide 2 Text",
    buttonText: "Shop Now",
    buttonLink: "#",
  },
  {
    image: "/images/slide3.jpg",
    text: "Slide 3 Text",
    buttonText: "Discover",
    buttonLink: "#",
  },
  // Add more slides as needed
];

const SimpleSlider: React.FC = () => {
  return (
    <Slider {...settings}>
      {slides.map((slide, index) => (
        <div key={index} className="relative h-96">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          ></div>
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white">
            <h3 className="text-2xl mb-4">{slide.text}</h3>
            <a
              href={slide.buttonLink}
              className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-700 transition"
            >
              {slide.buttonText}
            </a>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default SimpleSlider;
