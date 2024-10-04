'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { IoEyeOutline } from 'react-icons/io5';
import { MdStar, MdStarBorder } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { State } from '@/redux/store';
import { CartItem } from '@/redux/slices/cart/types';
import { addItem } from '@/redux/slices/cart';
import { openDrawer } from '@/redux/slices/drawer';
import ProductDetail from '../product-detail/product-detail';
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTrigger,
} from '../ui/dialog';
import { Skeleton } from '@/components/ui/skeleton'; // Adjust the path as necessary
import { IProduct, IReview } from '@/types/types';
import { useQuery } from '@tanstack/react-query';
import { fetchReviews } from '@/config/fetch';
import {
  calculateRatingsPercentage,
  generateSlug,
  renderStars,
} from '@/config';
import { IoIosHeartEmpty } from 'react-icons/io';

interface CardProps {
  card: IProduct;
  isModel?: boolean;
  isLoading?: boolean;
  cardHeight?: string;
}

const FeatureCard: React.FC<CardProps> = ({
  card,
  isModel,
  isLoading,
  cardHeight,
}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoading == false) {
      setLoading(false);
    }
  }, [isLoading]);

  const Navigate = useRouter();
  const dispatch = useDispatch<Dispatch>();

  const itemToAdd: CartItem = {
    ...card,
    quantity: 1,
  };

  const handleAddToCard = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    dispatch(addItem(itemToAdd));
    dispatch(openDrawer());
  };

  const {
    data: reviews = [],
    error,
    isLoading: reviewLoading,
  } = useQuery<IReview[], Error>({
    queryKey: ['reviews'],
    queryFn: fetchReviews,
  });
  const productId = card?.id;
  // const filteredReviews = reviews.filter(
  //   (review) => review.productId === productId,
  // );

  const filteredReviews = Array.isArray(reviews)
    ? reviews.filter((review) => review.productId === productId)
    : [];
  const { averageRating } = calculateRatingsPercentage(filteredReviews);

  const handleNavigation = (e: any) => {
    Navigate.push(`/product/${generateSlug(card.name)}`);
  };

  return (
    <div className="space-y-3 px-4 relative ">
      {loading ? (
        <Skeleton className={cardHeight} />
      ) : (
        <div className="relative group">
          {!isModel && (
            <Dialog>
              <DialogTrigger>
                <div className="bg-white h-auto py-3 z-20 absolute top-24 right-2 w-10 rounded-3xl flex justify-center items-center cursor-pointer opacity-0 group-hover:opacity-100 duration-300 transition-all">
                  <IoEyeOutline size={25} />
                </div>
              </DialogTrigger>
              <DialogOverlay />
              <DialogContent className="max-w-[1400px] w-11/12 bg-white px-0 sm:rounded-3xl border border-black shadow-none gap-0 pb-0">
                <div className="pb-6 px-5 xs:px-10 me-4 xs:me-7 mt-6 max-h-[80vh] overflow-y-auto custom-scroll">
                  <ProductDetail
                    params={card}
                    isZoom={false}
                    gap="gap-10 md:gap-20"
                    swiperGap="gap-5"
                    detailsWidth="w-full md:w-1/2 lg:w-2/5"
                  />
                </div>
              </DialogContent>
            </Dialog>
          )}

          <div className=" w-10 h-12 absolute right-2 top-8 rounded-xl  flex justify-center items-center border bg-white hover:border-main hover:bg-main hover:text-white  cursor-pointer">
            <IoIosHeartEmpty size={25} />
          </div>
          {card.sale !== '0' && (
            <div className="bg-[#FF0000] h-auto py-2 px-4 rounded-3xl absolute top-8 left-2 flex justify-center items-center cursor-pointer">
              <p className="text-15 text-white">
                {card.sale}
                <span>%</span>
              </p>
            </div>
          )}

          <div onClick={(e) => handleNavigation(e)} className="cursor-pointer">
            <Image
              width={400}
              height={400}
              src={card.posterImageUrl}
              alt={card.name}
              className={`z-10 rounded-2xl ${cardHeight}`}
            />
          </div>
          <div className="flex justify-between px-1 mt-3">
            <p className="text-15">{card.name}</p>
            <div className="flex">
              {' '}
              {averageRating > 0 && renderStars({ star: averageRating })}
            </div>
          </div>

          {card.discountPrice > 0 ? (
            <div className="border-t flex gap-5 pt-3 px-1">
              <p className="text-12">
                AED<span>{card.discountPrice}</span>.00
              </p>
              <p className="text-12 line-through text-[#A5A5A5] font-semibold">
                AED<span>{card.price}</span>.00
              </p>
            </div>
          ) : (
            <div className="border-t flex gap-5 pt-3 px-1">
              <p className="text-12 font-semibold">
                AED<span>{card.price}</span>.00
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FeatureCard;
