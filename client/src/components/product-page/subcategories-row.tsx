import { generateSlug } from '@/config';
import { fetchSubCategories } from '@/config/fetch';
import { ICategory } from '@/types/types';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { Skeleton } from '../ui/skeleton';
import { Navigation, Pagination } from 'swiper/modules';
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from 'react-icons/md';
import { Swiper, SwiperSlide } from 'swiper/react';

const SubCategoriesRow = () => {
  const path = usePathname();
  const cat = path?.split('/').filter(Boolean).pop();

  const {
    data: subCategories = [],
    error,
    isLoading,
  } = useQuery<ICategory[], Error>({
    queryKey: ['categories'],
    queryFn: fetchSubCategories,
  });
  if (isLoading)
    return (
      <div className="space-y-4">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
      </div>
    );

  const filteredSubCategories = subCategories.filter(
    (item) =>
      item.categories &&
      Array.isArray(item.categories) &&
      item.categories.some(
        (category: any) => generateSlug(category.name) === cat,
      ),
  );

  if (error) return <div>Error: {error.message}</div>;

  if (filteredSubCategories.length === 0) {
    return null;
  }
  return (
    <div
      className={`relative px-2 sm:px-8 ${
        filteredSubCategories.length === 2
          ? 'w-full md:w-6/12 lg:4/12 xl:2/12'
          : filteredSubCategories.length === 4
            ? 'w-full sm:w-6/12'
            : 'w-full sm:w-8/12'
      }`}
    >
      <button
        className="absolute -left-4 sm:left-0 top-1/2 transform -translate-y-1/2 z-10"
        id="swiper-prev"
      >
        <MdOutlineKeyboardArrowLeft size={30} />
      </button>
      <button
        className="absolute -right-4 sm:right-0 top-1/2 transform -translate-y-1/2 z-10"
        id="swiper-next"
      >
        <MdOutlineKeyboardArrowRight size={30} />
      </button>

      <Swiper
        spaceBetween={10}
        modules={[Navigation]}
        navigation={{
          prevEl: '#swiper-prev',
          nextEl: '#swiper-next',
        }}
        breakpoints={{
          320: { slidesPerView: 2 },
          480: { slidesPerView: 3 },
          768: {
            slidesPerView:
              filteredSubCategories.length > 4
                ? 4
                : filteredSubCategories.length,
          },
          1024: {
            slidesPerView:
              filteredSubCategories.length > 6
                ? 6
                : filteredSubCategories.length,
          },
        }}
      >
        {filteredSubCategories.map((category, index) => (
          <SwiperSlide
            key={index}
            className="text-center bg-[#afa183] rounded-lg py-2 px-2 text-white whitespace-nowrap w-full "
          >
            <Link
              href={`/products/${generateSlug(category.name)}/?id=${category.id}`}
              key={category.id}
              className="w-full "
            >
              <span>{category.name}</span>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SubCategoriesRow;
