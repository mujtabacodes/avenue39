"use client"
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import { Scrollbar } from 'swiper/modules';

interface DiscountCardProps {
  productItems: Array<{
    id: number;
    imageUrl: string | StaticImageData;
    title: string;
  }>;
}

const DiscountCard: React.FC<DiscountCardProps> = ({
  productItems,
}) => {


  return (
    <div className='py-5 px-2'>
      <Swiper
      slidesPerView={1.3}
      spaceBetween={20}
      scrollbar={{
        enabled: true,
        draggable: true,
        hide: false,
      }}
      breakpoints={{
        1336: {
          slidesPerView: 5,
        },
        1216: {
          slidesPerView: 4.5,
        },
        1068: {
          slidesPerView: 4,
        },
        768: {
          slidesPerView: 3.5,
        },
        652: {
          slidesPerView: 3,
        },
        480: {
          slidesPerView: 2.5,
        },
        383: {
          slidesPerView: 2,
        },
      }}
      modules={[Scrollbar]}
      className="mySwiper"
    >
      {productItems.map((item) => (
        <SwiperSlide className="mb-5" key={item.id}>
          <Link href="/products" >
            <Image src={item.imageUrl} alt="product image" className="w-full" />
            <div className="text-14 sm:text-16 lg:text-[20px] font-bold mt-3 pb-1 ">
              {item.title}
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
    </div>
  );
};

export default DiscountCard;

