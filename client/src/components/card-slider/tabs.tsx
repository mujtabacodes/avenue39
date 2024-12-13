'use client';

import React, { useState, useEffect, useRef } from 'react';
import SliderComponent from './card-slider';
import { ISliderData } from '@/types/types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';

interface TabsProps {
  slidersData: ISliderData[];
  isLoading: boolean;
}

const Tabs: React.FC<TabsProps> = ({ slidersData, isLoading }) => {
  const [activeTab, setActiveTab] = useState(0);
  const tabMenuRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Handle click navigation between tabs
  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  // Handle horizontal scroll button visibility
  const updateScrollIconsVisibility = () => {
    if (!tabMenuRef.current) return;

    const tabMenu = tabMenuRef.current;
    const scrollLeftValue = Math.ceil(tabMenu.scrollLeft);
    const scrollableWidth = tabMenu.scrollWidth - tabMenu.clientWidth;
  };

  // Handle scroll left and right actions
  const handleScroll = (direction: string) => {
    if (!tabMenuRef.current) return;

    const tabMenu = tabMenuRef.current;
    const scrollAmount = 150;

    if (direction === 'left') {
      tabMenu.scrollLeft -= scrollAmount;
    } else if (direction === 'right') {
      tabMenu.scrollLeft += scrollAmount;
    }

    setTimeout(() => updateScrollIconsVisibility(), 50);
  };

  // Handle dragging functionality
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!tabMenuRef.current) return;

    setIsDragging(true);
    setStartX(e.pageX - tabMenuRef.current.offsetLeft);
    setScrollLeft(tabMenuRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !tabMenuRef.current) return;

    const x = e.pageX - tabMenuRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Adjust the multiplier for faster/slower dragging
    tabMenuRef.current.scrollLeft = scrollLeft - walk;
    updateScrollIconsVisibility();
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    updateScrollIconsVisibility();
    const tabMenu = tabMenuRef.current;

    // Update on window resize
    const handleResize = () => {
      updateScrollIconsVisibility();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [slidersData]);

  return (
    <div className="space-y-4 md:space-y-8">
      <div className="flex flex-row flex-wrap md:flex-nowrap justify-center lg:justify-between gap-2 md:gap-6 items-center mt-8">
        <div>
          <h3 className="text-3xl font-semibold mb-4 md:mb-0 text-nowrap">
            Most Popular Items
          </h3>
        </div>

        <div className="max-w-full xs:max-w-[450px] sm:max-w-[600px] md:max-w-[650px] relative px-2 sm:px-8">
          <button
            className="absolute -left-2 sm:left-0 top-1/2 transform -translate-y-1/2 z-10"
            id="swiper-prev"
          >
            <MdOutlineKeyboardArrowLeft size={30} />
          </button>
          <button
            className="absolute -right-2 sm:right-0 top-1/2 transform -translate-y-1/2 z-10"
            id="swiper-next"
          >
            <MdOutlineKeyboardArrowRight size={30} />
          </button>

          <Swiper
            spaceBetween={10}
            modules={[Navigation]}
            navigation={{
              prevEl: '#swiper-prev',
              nextEl: '#swiper-next',
            }}
            className="custom-tab-swiper"
            breakpoints={{
              320: { slidesPerView: 2, spaceBetween: 0 },
              380: { slidesPerView: 3, spaceBetween: 0 },
              1024: { slidesPerView: 4 }, 
            }}
          >
            {slidersData.map((slider, index) => (
              <SwiperSlide key={index} className='text-center'>
                <button
                  onClick={() => handleTabClick(index)}
                  className={`font-medium text-nowrap px-4 xsm:px-3 xs:px-4 py-2 text-16 xsm:text-12 xs:text-14 sm:text-16 rounded-full transition-colors duration-300 ${index === activeTab ? 'bg-main text-white' : 'bg-white text-black'
                    }`}
                >
                  {slider.tabTitle}
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {isLoading ? (
        <SliderComponent isLoading={isLoading} sliderArrow={true} />
      ) : (
        <SliderComponent
          cards={slidersData[activeTab]?.cards || []}
          isLoading={isLoading}
          sliderArrow={true}
        />
      )}
    </div>
  );
};

export default Tabs;
