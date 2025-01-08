"use client";
import React from 'react';
import { HiMinusSm, HiPlusSm } from 'react-icons/hi';

interface CounterProps {
  count: number; 
  // eslint-disable-next-line unused-imports/no-unused-vars
  onChangeCount: (count: number) => void;
}

const Counter: React.FC<CounterProps> = ({ count, onChangeCount }) => {
  const onIncrement = () => {
    onChangeCount(count + 1);
  };

  const onDecrement = () => {
    if (count > 0) {
      onChangeCount(count - 1);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!isNaN(Number(value)) && value.trim() !== '') {
      onChangeCount(Number(value));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && count >= 1 && count <= 9) {
      onChangeCount(0); // Set count to 0 on backspace
    }
  };
console.log(count,"count")
  return (
    <div className="flex items-center border border-gray-300 rounded py-1 md:p-2 md:py-3 w-fit">
      <button
        onClick={onDecrement}
        className="px-2 text-gray-600"
        disabled={count <= 0} // Disable if count is 0
      >
        <HiMinusSm size={20} />
      </button>
      <input
        type="text"
        value={count}
        onKeyDown={handleKeyDown}
        onChange={onChange}
        className="mx-2 text-center w-12 border-none outline-none"
      />
      <button onClick={onIncrement} className="px-2 text-gray-600">
        <HiPlusSm size={20} />
      </button>
    </div>
  );
};

export default Counter;
