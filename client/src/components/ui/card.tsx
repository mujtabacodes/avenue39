import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { IProduct } from '@/types/types';
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
import { PiEyeThin } from 'react-icons/pi';
import { CiHeart } from 'react-icons/ci';
import { generateSlug } from '@/config';
interface CardProps {
  card: IProduct;
  isModel?: boolean;
  className?: string;
  skeletonHeight?: string;
}

const Card: React.FC<CardProps> = ({
  card,
  isModel,
  className,
  skeletonHeight,
}) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch<Dispatch>();
  const cartItems = useSelector((state: State) => state.cart.items);
  const Navigate = useRouter();

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => setLoading(false), 4000); // Simulate 2-second loading time
    return () => clearTimeout(timer);
  }, []);
  const handleEventProbation = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  };

  const itemToAdd: CartItem = {
    ...card,
    quantity: 1,
  };
  const handleAddToCard = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    dispatch(addItem(itemToAdd));
    dispatch(openDrawer());
  };
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <=0 || i <= 4) {
        stars.push(<MdStar key={i} size={18} className="text-yellow-400" />);
      } else {
        stars.push(
          <MdStarBorder key={i} size={18} className="text-yellow-400" />,
        );
      }
    }
    return stars;
  };

  const handleNavigation = (e: any) => {
    Navigate.push(`/product/${generateSlug(card.name)}`);
  };
  return (
    <div
      className="rounded-3xl text-center relative product-card mx-4 group hover:cursor-pointer mb-2"
      onClick={(e) => handleNavigation(e)}
    >
      <div className="relative w-full">
        {loading ? (
          <Skeleton className={`w-full rounded-3xl ${skeletonHeight}`} />
        ) : (
          <>
            {card.sale !== '0' && (
              <span className="absolute top-4 left-4 text-white text-15 font-light bg-red-500 rounded-full w-[76px] h-9 flex justify-center items-center">
                - {card.sale}%
              </span>
            )}
            <Image
              src={card.posterImageUrl}
              alt={card.name}
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
        <>
          <h3 className="text-lg font-semibold mt-2">{card.name}</h3>
          <p className="text-xs font-semibold mt-1">
            AED{card.discountPrice}
            <span className="line-through text-secondary-foreground ms-2">
              AED{card.price}
            </span>
          </p>
          <div className="flex gap-1 items-center justify-center mt-1">
            {renderStars()}
          </div>
        </>
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
