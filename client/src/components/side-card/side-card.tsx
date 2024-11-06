'use client';

import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { MdStar, MdStarBorder } from 'react-icons/md';
import { Skeleton } from '@/components/ui/skeleton';
import {
  calculateRatingsPercentage,
  generateSlug,
  renderStars,
} from '@/config';
import { useQuery } from '@tanstack/react-query';
import { IProduct, IReview } from '@/types/types';
import { fetchProducts, fetchReviews } from '@/config/fetch';

interface sideCardProps {
  isSlice?: boolean;
}

const SideCard: React.FC<sideCardProps> = ({ isSlice }) => {
  const {
    data: products = [],
    error: productsError,
    isLoading: isProductsLoading,
  } = useQuery<IProduct[], Error>({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  const {
    data: reviews = [],
    error: reviewsError,
    isLoading: isReviewsLoading,
  } = useQuery<IReview[], Error>({
    queryKey: ['reviews'],
    queryFn: fetchReviews,
  });

  if (isProductsLoading || isReviewsLoading) {
    return (
      <div className="mt-7 flex flex-col lg:gap-7 sm:gap-12">
        {Array(3)
          .fill(0)
          .map((_, index) => (
            <div key={index} className="flex gap-4 items-center">
              <Skeleton className="w-44 h-44" />
              <div className="flex flex-col gap-3 w-1/2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-2 w-1/2" />
                <Skeleton className="h-2 w-1/4" />
                <Skeleton className="h-2 w-1/4" />
                <Skeleton className="h-4 w-2/4" />
              </div>
            </div>
          ))}
      </div>
    );
  }

  if (productsError || reviewsError) {
    return <div>Error loading data</div>;
  }

  return (
    <div className="mt-7 flex flex-col lg:gap-7 sm:gap-12">
      {products.slice(-3).map((item, index) => {
        const filteredReviews = Array.isArray(reviews)
          ? reviews.filter((review) => review.productId === item.id)
          : [];
        const { averageRating } = calculateRatingsPercentage(filteredReviews);

        return (
          <Link
            href={`/product/${generateSlug(item.name)}`}
            key={index}
            className="flex gap-4 items-center"
          >
            <div className="w-1/2 min-w-32">
              <Image
                src={item.posterImageUrl}
                width={180}
                height={180}
                alt={item.name}
                className="w-44 h-44 rounded-2xl"
              />
            </div>
            <div className="flex flex-col gap-3 w-1/2">
              <p className="text-[13px] font-semibold">{item.name}</p>
              <hr />
              <p className="text-[12px] font-semibold">
                AED{item.discountPrice.toFixed(2)}
              </p>
              {item.price && (
                <>
                  <p className="text-9 font-semibold line-through text-[#A5A5A5]">
                    AED{item.price.toFixed(2)}
                  </p>

                  {item.sale && item.sale !== '0' && (
                    <div className="bg-[#FF0000] w-10 h-5 text-[8px] rounded-3xl text-white flex justify-center items-center">
                      {item.sale}
                    </div>
                  )}
                </>
              )}
              <div className="flex">
                {averageRating > 1 && renderStars({ star: averageRating })}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default SideCard;
