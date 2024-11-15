'use client';

import React, { useState, useEffect, useRef } from 'react';
import SliderComponent from './card-slider';
import { ISliderData } from '@/types/types';

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
      <div className="flex flex-row flex-wrap justify-center lg:justify-between gap-6 items-center mt-8">
        <div>
          <h3 className="text-3xl font-semibold mb-4 md:mb-0 text-nowrap">
            Most Popular Items
          </h3>
        </div>

        <div
          className="flex flex-nowrap gap-4 max-w-[450px] whitespace-nowrap pb-1 custom-scrollbar overflow-x-auto mb-2"
          ref={tabMenuRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
        >
          {slidersData.map((slider, index) => (
            <button
              key={index}
              onClick={() => handleTabClick(index)}
              className={`font-medium px-4 py-2 rounded-full transition-colors duration-300 ${index === activeTab ? 'bg-main text-white' : 'bg-white text-black'}`}
            >
              {slider.tabTitle}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <SliderComponent isLoading={isLoading} sliderArrow={true} />
      ) : (
        <SliderComponent
          cards={slidersData[activeTab].cards}
          isLoading={isLoading}
          sliderArrow={true}
        />
      )}
    </div>
  );
};

export default Tabs;
