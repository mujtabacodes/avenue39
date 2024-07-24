'use client';
import React, { useState } from 'react';
import SliderComponent from './card-slider'; // Make sure to use the correct path
import { SliderData } from '@/types/types';

interface TabsProps {
  slidersData: SliderData[];
}

const Tabs: React.FC<TabsProps> = ({ slidersData }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row justify-between items-center mt-8">
        <div>
          <h3 className="text-3xl font-semibold mb-4 md:mb-0">Most Popular Items</h3>
        </div>
        <div className="flex flex-wrap gap-4">
          {slidersData.map((slider, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-6 py-2 rounded-full transition-colors duration-300 ${index === activeTab ? 'bg-primary text-secondary' : 'bg-white text-primary border border-gray-300'}`}
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
