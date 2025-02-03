import React from 'react';

const CardSkaleton = () => {
  const skeletonArray = new Array(3).fill(0); // Create an array of 3 items

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {skeletonArray.map((_, index) => (
        <div className="w-full p-4 animate-pulse" key={index}>
          <div className="bg-gray-200 h-64 rounded-lg mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-10 bg-gray-200 rounded-lg w-full"></div>
        </div>
      ))}
    </div>
  );
};

export default CardSkaleton;
