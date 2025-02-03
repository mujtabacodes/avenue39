import React from 'react';
import { ImNotification } from 'react-icons/im';

interface NoProductProps {
    cardHeight?: string;
    iconSize?: number;
    title?: string;
    titleClass?: string;
}

const NoProduct: React.FC<NoProductProps> = ({cardHeight , iconSize , title , titleClass}) => {
  return (
    <div
      className={`flex justify-center items-center w-full h-[400px] md:h-[250px] lg:h-[400px] ${cardHeight ? cardHeight : 'xl:h-[672px]'}`}
    >
      <div>
        <ImNotification size={iconSize} className="mx-auto mb-2" />
        <span className={titleClass}>{title}</span>
      </div>
    </div>
  );
};

export default NoProduct;
