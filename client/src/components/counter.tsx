'use client';
import React, { useState } from 'react';
import { HiMinusSm, HiPlusSm } from 'react-icons/hi';

const Counter: React.FC = () => {
  const [count, setCount] = useState<number>(1);

  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const handleDecrement = () => {
    setCount((prevCount) => (prevCount > 1 ? prevCount - 1 : prevCount));
  };

  return (
    <div className="flex items-center border border-gray-300 rounded py-1 md:p-2 md:py-3">
      <button
        onClick={handleDecrement}
        className="px-2 text-gray-600"
        disabled={count <= 1}
      >
        <HiMinusSm size={20} />
      </button>
      <span className="mx-2">{count}</span>
      <button onClick={handleIncrement} className="px-2 text-gray-600">
        <HiPlusSm size={20} />
      </button>
    </div>
  );
};

export default Counter;
