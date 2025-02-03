import React from 'react';
import { MdArrowBackIos } from 'react-icons/md';

const HotProductPrevArrow: React.FC<any> = (props) => {
  const { onClick } = props;
  return (
    <div
      className="hot-product-prev-arrow cursor-pointer text-xl absolute -top-10 right-10"
      onClick={onClick}
    >
      <MdArrowBackIos />
    </div>
  );
};

export default HotProductPrevArrow;
