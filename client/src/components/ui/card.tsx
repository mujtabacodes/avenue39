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
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from './dialog';
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
import { message } from 'antd';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { TiShoppingCart } from 'react-icons/ti';
interface CardProps {
  card?: IProduct;
  isModel?: boolean;
  className?: string;
  skeletonHeight?: string;
  isLoading?: boolean;
  category?: boolean;
  cardImageHeight?: string;
}

const Card: React.FC<CardProps> = ({
  card,
  isModel,
  className,
  skeletonHeight,
  isLoading,
  category,
  cardImageHeight,
}) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch<Dispatch>();
  const Navigate = useRouter();

  const handleAddToWishlist = (product: IProduct) => {
    // Create a new wishlist item
    const newWishlistItem = {
      id: product.id, // Ensure you have the correct property here
      name: product.name,
      price: product.price,
      posterImageUrl: product.posterImageUrl,
      discountPrice: product.discountPrice,
      count: 1, // Initialize count to 1 for a new item
      totalPrice: product.discountPrice ? product.discountPrice : product.price,
    };

    // Retrieve existing wishlist from local storage
    let existingWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');

    // Check if the product is already in the wishlist
    const existingItemIndex = existingWishlist.findIndex(
      (item: any) => item.id === newWishlistItem.id,
    ); // Use newWishlistItem.id here

    if (existingItemIndex !== -1) {
      // If it exists, increment the count and update the total price
      existingWishlist[existingItemIndex].count += 1;
      existingWishlist[existingItemIndex].totalPrice =
        existingWishlist[existingItemIndex].count *
        (existingWishlist[existingItemIndex].discountPrice ||
          existingWishlist[existingItemIndex].price);
    } else {
      // If it doesn't exist, add the new item to the wishlist
      existingWishlist.push(newWishlistItem);
    }

    // Save updated wishlist back to local storage
    localStorage.setItem('wishlist', JSON.stringify(existingWishlist));

    // Show success message
    message.success('Product added to Wishlist successfully!');

    // Dispatch custom event to update the count in the navbar
    window.dispatchEvent(new Event('WishlistChanged'));

    // Debugging: log the current state of the wishlist
    console.log(existingWishlist, 'existingWishlist');
  };

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

  // if (category) {
  //   console.log(card);
  // }
  return (
    <div className="rounded-3xl text-center relative product-card mx-4 group hover:cursor-pointer mb-2">
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
            <div
              onClick={() => handleAddToWishlist(card)}
              className=" w-10 h-12 absolute right-2 top-2 rounded-xl  flex justify-center items-center border bg-white hover:border-main hover:bg-main hover:text-white  cursor-pointer"
            >
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
                cardImageHeight,
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
            <p className="text-md font-semibold mt-1">
              <span className="line-through text-secondary-foreground ms-2 mr-2">
                AED {card.price}
              </span>
              AED {card.discountPrice}
            </p>
          ) : (
            <span className="text-md text-black font-semibold">
              AED {card.price}
            </span>
          )}

          <div className="flex gap-1 items-center justify-center mt-1 h-5">
            {averageRating > 1 && renderStars({ star: averageRating })}
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
          className="text-center flex flex-wrap justify-center md:gap-3 space-y-2 md:space-y-0 "
          onClick={(e) => handleEventProbation(e)}
        >
          <button
            className="md:my-4 w-full md:w-32 h-8 text-primary border border-primary rounded-full flex items-center justify-center gap-2 hover:bg-primary hover:text-white"
            onClick={(e) => handleAddToCard(e)}
          >
            <TiShoppingCart />
            <span className="text-12 font-medium">Add to Cart</span>
          </button>
          <Dialog>
            <DialogTrigger>
              <button className="md:my-4 w-60 md:w-32 h-8 text-secondary border border-primary bg-primary rounded-full flex items-center justify-center gap-2 hover:bg-secondary hover:text-primary">
                <span className="text-12 font-medium">Quick View</span>
              </button>
            </DialogTrigger>
            <DialogOverlay />
            <DialogContent className="max-w-[1400px] w-11/12 bg-white px-0 sm:rounded-3xl border border-black shadow-none gap-0 pb-0">
              <VisuallyHidden>
                <DialogTitle>Product Detail</DialogTitle>
              </VisuallyHidden>
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
