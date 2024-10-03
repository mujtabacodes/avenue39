"use client"
import React, { useState } from 'react'
import { HiMinusSm, HiPlusSm } from 'react-icons/hi';

const Counter = () => {
    const [count, setCount] = useState(0); // Initialize count to 0

    const onIncrement = () => {
      setCount((prevCount) => prevCount + 1); // Increment the count
    };
  
    const onDecrement = () => {
      setCount((prevCount) => prevCount > 0 ? prevCount - 1 : prevCount); // Decrement only if count > 0
    };
  
    const onChange = (e: any) => {
      const value = e.target.value;
      if (!isNaN(value) && value.trim() !== '') {
        setCount(Number(value));
      }
    };
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      // If the user presses backspace and the current count is 1 to 9, set the count to 0
      if (e.key === 'Backspace' && count >= 1 && count <= 9) {
        setCount(0);
      }
    };
  return (
    <>
      <div className="flex items-center border border-gray-300 rounded py-1 md:p-2 md:py-3 w-fit">
            <button
              onClick={onDecrement}
              className="px-2 text-gray-600"
              disabled={count <= -10} // Adjust as needed for your minimum count
            >
              <HiMinusSm size={20} />
            </button>
            <input
              type="text"
              value={count}
              onKeyDown={handleKeyDown}
              onChange={onChange}
              className="mx-2 text-center w-12 border-none outline-none" // Adjust width as needed
            />
            <button onClick={onIncrement} className="px-2 text-gray-600">
              <HiPlusSm size={20} />
            </button>
          </div>
          </>
  )
}

export default Counter