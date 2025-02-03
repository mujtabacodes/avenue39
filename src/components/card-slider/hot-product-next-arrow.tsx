import React from 'react';
import { MdArrowForwardIos } from 'react-icons/md';

const HotProductNextArrow: React.FC<any> = (props) => {
  const { onClick } = props;
  return (
    <div className="hot-product-next-arrow cursor-pointer text-xl absolute -top-10 right-4" onClick={onClick}>
      <MdArrowForwardIos  />
    </div>
  );
};

export default HotProductNextArrow;