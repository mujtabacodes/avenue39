'use client';
import React, { useState } from 'react';
import SliderComponent from './card-slider'; // Make sure to use the correct path


interface SliderData {
  tabTitle: string;
  cards: ICard[];
}

interface ICard {
  id: number;
  image: any;
  heading: string;
  price: string;
  discount?: string;
  sale: string;
  reviews: number;
}


interface TabsProps {
  slidersData: ISliderData[];
}

const Tabs: React.FC<TabsProps> = ({ slidersData }:any) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="p-4">
      <div className="flex flex-row flex-wrap justify-center lg:justify-between gap-6 items-center mt-8">
        <div>
          <h3 className="text-3xl font-semibold mb-4 md:mb-0 text-nowrap">Most Popular Items</h3>
        </div>

        <div className="flex flex-nowrap gap-4 w-[518px] overflow-x-auto">
          {slidersData.map((slider, index) => (

            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-6 py-2 rounded-full transition-colors duration-300 ${index === activeTab ? 'bg-primary text-secondary' : 'bg-white text-primary'}`}
            >
              {slider.tabTitle}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-4 sliderTabes">
        <SliderComponent cards={slidersData[activeTab].cards} />
      </div>
    </div>
  );
};

export default Tabs;
