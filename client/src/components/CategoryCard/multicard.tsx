import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Image from 'next/image';
import { IProduct, IReview } from '@/types/types';
import { HiOutlineViewfinderCircle } from 'react-icons/hi2';
import { useDispatch } from 'react-redux';
import { Dispatch } from '@redux/store';
import { addItem } from '@cartSlice/index';
import { CartItem } from '@cartSlice/types';
import { openDrawer } from '@/redux/slices/drawer';
import { useRouter } from 'next/navigation';
import ProductDetail from '../product-detail/product-detail';
import { cn } from '@/lib/utils';
import {
  calculateRatingsPercentage,
  generateSlug,
  renderStars,
} from '@/config';
import { useQuery } from '@tanstack/react-query';
import { fetchReviews } from '@/config/fetch';
import CardSkeleton from '../cardSkelton';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { TiShoppingCart } from 'react-icons/ti';
import { Skeleton } from '../ui/skeleton';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
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
  cardImageHeight,
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

  const { data: reviews = [] } = useQuery<IReview[], Error>({
    queryKey: ['reviews'],
    queryFn: fetchReviews,
  });
  const productId = card?.id;
  const filteredReviews = Array.isArray(reviews)
    ? reviews.filter((review) => review.productId === productId)
    : [];

  const { averageRating } = calculateRatingsPercentage(filteredReviews);
  const handleNavigation = () => {
    Navigate.push(`/product/${generateSlug(card?.name || '')}`);
  };

  if (!card) {
    return <CardSkeleton skeletonHeight={skeletonHeight} />;
  }
  return (
    <div className="text-center relative product-card group hover:cursor-pointer mb-2  h-full  p-1 rounded-[35px]">
      <div className="relative w-full overflow-hidden rounded-[35px] pb-2">
        {loading ? (
          <CardSkeleton skeletonHeight={skeletonHeight} />
        ) : (
          <>
            <Swiper className="mySwiper overflow-hidden w-full" pagination={true} modules={[Pagination]}>
              {card.productImages.map((array, index) => (
                <SwiperSlide key={index} className='w-full'>
                  <Image
                    src={array.imageUrl}
                    alt={array.altText || 'image'}
                    onClick={() => handleNavigation()}
                    width={600}
                    height={600}
                    className={cn(
                      'object-cover rounded-[35px] w-full',
                      className,
                      skeletonHeight,
                      cardImageHeight,
                    )}
                  />
                  {card.discountPrice > 1 && (
                    <span className="absolute top-[3px] -right-[29px] px-7 bg-[#FF0000] text-white font-bold rounded-t-full rounded-tl-full rounded-br-lg rotate-45 w-[105px] h-[40px] flex justify-center items-center">
                      {Math.round(
                        ((card.price - card.discountPrice) / card.price) * 100,
                      )}
                      %
                    </span>
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
          </>
        )}
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
          <div className="space-y-3" onClick={() => handleNavigation()}>
            <h3 className="text-sm md:text-[22px] text-gray-600 font-Helveticalight mt-2">
              {card.name}
            </h3>
            <div>
              {card.discountPrice > 0 ? (
                <div className="flex gap-2 justify-center">
                  <p className="text-sm md:text-18 font-bold line-through font-Helveticalight">
                    AED<span>{card.price}</span>
                  </p>
                  <p className="text-sm md:text-18 font-bold text-[#FF0000]">
                    AED<span>{card.discountPrice}</span>
                  </p>
                </div>
              ) : (
                <span className="text-sm md:text-18 font-bold ">
                  AED {card.price}
                </span>
              )}
            </div>
            {averageRating > 0 && (
              <div className="flex gap-1 items-center justify-center mt-1 h-5">
                {renderStars({ star: averageRating })}
              </div>
            )}
          </div>
        )}
      </div>

      {loading ? (
        <div className="flex gap-2 justify-center mt-2">
          <Skeleton className="w-32 h-8 rounded-full" />
          <Skeleton className="w-32 h-8 rounded-full" />
        </div>
      ) : isModel ? null : (
        <div
          className="text-center flex flex-wrap md:flex-nowrap justify-center gap-1 md:space-y-0 w-full sm:w-fit mx-auto"
          onClick={(e) => handleEventProbation(e)}
        >
          <button
            className=" my-1 px-6 w-full h-8 text-primary border border-primary  rounded-full flex items-center justify-center whitespace-nowrap gap-2 hover:bg-primary hover:text-white"
            onClick={(e) => handleAddToCard(e)}
          >
            <TiShoppingCart />
            <span className="text-12 font-medium">Add to Cart</span>
          </button>
          <Dialog>
            <DialogTrigger className="w-full">
              <button className=" my-1 px-6 w-full h-8 whitespace-nowrap text-secondary border border-primary bg-primary rounded-full flex items-center justify-center gap-2 hover:bg-secondary hover:text-primary">
                <HiOutlineViewfinderCircle />
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
