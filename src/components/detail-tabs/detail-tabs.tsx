import React, { useState, FC } from 'react';
import Container from '../ui/Container';
import { TiArrowSortedUp } from 'react-icons/ti';
import BestSellingSlider from '../card-slider/best-selling';

interface Tab {
  label: string;
  content: React.ReactNode;
}

interface DetailTabsProps {
  tabs: Tab[];
}

const DetailTabs: FC<DetailTabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <div className="w-full mt-5 min-h-48 border-t-[1px]">
      <Container>
        <div className="flex flex-nowrap  font-helvetica gap-8 sm:gap-16 md:gap-8 lg:gap-10 py-4 xs:py-9 w-76 sm:w-full overflow-x-auto overflow-y-hidden scrollbar-hide">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`focus:outline-none whitespace-nowrap text-16 xs:text-lg font-helvetica ${
                activeTab === index
                  ? 'text-slate-400 rounded-t-md relative font-medium'
                  : 'text-slate-400'
              }`}
              onClick={() => setActiveTab(index)}
            >
              {tab.label}
              {activeTab === index && (
                <TiArrowSortedUp
                  size={30}
                  className="absolute rounded-t-md -bottom-12 left-1/2 -translate-x-1/2 hidden xs:block"
                />
              )}
            </button>
          ))}
        </div>
      </Container>
      <div className="border-t-[1px]  font-helvetica">
        <Container className="px-4">
          <div className="w-full sm:w-2/3 lg:w-3/4 sm:px-4 .font-Helveticalight">
            {tabs[activeTab].content}
          </div>
          <div className="w-full relative mt-10">
            <BestSellingSlider />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default DetailTabs;
