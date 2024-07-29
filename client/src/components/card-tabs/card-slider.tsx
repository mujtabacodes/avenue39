
import React from 'react';
import Tabs from '@/components/card-slider/tabs';
import { slidersData } from '@/data';

const CardsTabes: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <Tabs slidersData={slidersData} />
    </div>
  );
};

export default CardsTabes;
