import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { IProduct, IReview } from '@/types/types';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { MdStar, MdStarBorder } from 'react-icons/md';

import { useSelector, useDispatch } from 'react-redux';
import { State, Dispatch } from '@redux/store';
import { addItem } from '@cartSlice/index';
import { CartItem } from '@cartSlice/types';
import { openDrawer } from '@/redux/slices/drawer';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogOverlay, DialogTrigger } from './dialog';
import ProductDetail from '../product-detail/product-detail';
import { cn } from '@/lib/utils';
import { Skeleton } from './skeleton';
import {
  calculateRatingsPercentage,
  generateSlug,
  renderStars,
} from '@/config';
import { useQuery } from '@tanstack/react-query';
import { fetchReviews } from '@/config/fetch';
import CardSkeleton from '../cardSkelton';
import { IoIosHeartEmpty } from 'react-icons/io';
interface CardProps {
  card?: IProduct;
  isModel?: boolean;
  className?: string;
  skeletonHeight?: string;
  isLoading?: boolean;
  category?: boolean;
}

const Card: React.FC<CardProps> = ({
  card,
  isModel,
  className,
  skeletonHeight,
  isLoading,
  category,
}) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch<Dispatch>();
  const Navigate = useRouter();

  useEffect(() => {
    if (isLoading == false) {
      setLoading(false);
    }
  }, [isLoading]);

  const handleEventProbation = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  };
  //@ts-ignore
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
  const filteredReviews = Array.isArray(reviews)
    ? reviews.filter((review) => review.productId === productId)
    : [];
  // const filteredReviews = reviews.filter(
  //   (review) => review.productId === productId,
  // );
  const { averageRating } = calculateRatingsPercentage(filteredReviews);
  const handleNavigation = (e: any) => {
    //@ts-ignore
    Navigate.push(`/product/${generateSlug(card.name)}`);
  };

  if (!card) {
    return <CardSkeleton skeletonHeight={skeletonHeight} />;
  }

  if (category) {
    console.log(card);
  }
  return (
    <div
      className="rounded-3xl text-center relative product-card mx-4 group hover:cursor-pointer mb-2"
      
    >
      <div className="relative w-full">
        {loading ? (
          <CardSkeleton skeletonHeight={skeletonHeight} />
        ) : (
          <>
            {card.sale !== '0' && (
              <span className="absolute top-4 left-4 text-white text-15 font-light bg-red-500 rounded-full w-[76px] h-9 flex justify-center items-center">
                - {card.sale}%
              </span>
            )}
            <div className=" w-10 h-12 absolute right-2 top-2 rounded-xl  flex justify-center items-center border bg-white hover:border-main hover:bg-main hover:text-white  cursor-pointer">
              <IoIosHeartEmpty size={25} />
            </div>
            <Image
              src={card.posterImageUrl}
              alt={card.name}
              onClick={(e) => handleNavigation(e)}
              width={600}
              height={600}
              className={cn(
                'object-cover rounded-3xl',
                className,
                skeletonHeight,
              )}
            />
          </>
        )}
      </div>
      {loading ? (
        <>
          <Skeleton className="h-5 w-52 mx-auto mt-3" />
          <Skeleton className="h-3 w-40 mx-auto mt-2" />
          <div className="flex gap-1 items-center justify-center h-4 mt-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} className="h-3 w-3 rounded-full" />
            ))}
          </div>
        </>
      ) : (
        <div onClick={(e) => handleNavigation(e)}>
          <h3 className="text-lg font-semibold mt-2">{card.name}</h3>
          {card.discountPrice > 0 ? (
            <p className="text-xs font-semibold mt-1">
              AED {card.discountPrice}
              <span className="line-through text-secondary-foreground ms-2">
                AED {card.price}
              </span>
            </p>
          ) : (
            <span className="text-xs text-black font-semibold">
              AED {card.price}
            </span>
          )}

          <div className="flex gap-1 items-center justify-center mt-1 h-5">
            {averageRating > 0 && renderStars({ star: averageRating })}
          </div>
        </div>
      )}
      {loading ? (
        <div className="flex gap-3 justify-center mt-3">
          <Skeleton className="w-32 h-8 rounded-full" />
          <Skeleton className="w-32 h-8 rounded-full" />
        </div>
      ) : isModel ? null : (
        <div
          className="text-center flex flex-none justify-center gap-3 "
          onClick={(e) => handleEventProbation(e)}
        >
          <button
            className="my-4 w-32 h-8 text-primary border border-primary rounded-full flex items-center justify-center gap-2 hover:bg-primary hover:text-white"
            onClick={(e) => handleAddToCard(e)}
          >
            <HiOutlineShoppingBag />
            <span className="text-10 font-medium">Add to Cart</span>
          </button>
          <Dialog>
            <DialogTrigger>
              <button className="my-4 w-32 h-8 text-secondary border border-primary bg-primary rounded-full flex items-center justify-center gap-2 hover:bg-secondary hover:text-primary">
                <span className="text-10 font-medium">Quick View</span>
              </button>
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
        </div>
      )}
    </div>
  );
};

export default Card;
