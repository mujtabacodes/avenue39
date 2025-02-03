import React from 'react';
import { Skeleton } from '../ui/skeleton';
interface ICardSkelton {
  className?: string;
  skeletonHeight?: string;
}

const CardSkeleton = ({ className, skeletonHeight }: ICardSkelton) => {
  return (
    <div
      className={`rounded-3xl text-center relative product-card mx-4 ${className}`}
    >
      <div className="relative w-full">
        <Skeleton className={`w-full h-48 ${skeletonHeight} rounded-3xl `} />
      </div>
      <div className="mt-2">
        <Skeleton className="h-5 w-52 mx-auto mt-3" />
        <Skeleton className="h-3 w-40 mx-auto mt-2" />
        <div className="flex gap-1 items-center justify-center h-4 mt-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="h-3 w-3 rounded-full" />
          ))}
        </div>
      </div>
      <div className="flex gap-3 justify-center mt-3">
        <Skeleton className="w-32 h-8 rounded-full" />
        <Skeleton className="w-32 h-8 rounded-full" />
      </div>
    </div>
  );
};

export default CardSkeleton;
