import React from 'react';
import { Button } from '../ui/button';
import SliderComponent from '../card-slider/card-slider';
import { cards } from '@/data';
import { products } from '@/data/products';
import { IProduct } from '@/types/types';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '@/config/fetch';
import { useRouter } from 'next/navigation';
interface SliderProps {
  cards: IProduct[];
  isModel?: boolean;
}

const TopSelling: React.FC = () => {
  const route = useRouter();
  const {
    data: products = [],
    error: productsError,
    isLoading: isProductsLoading,
  } = useQuery<IProduct[], Error>({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });
  return (
    <div className="flex flex-col md:flex-row gap-8 items-center">
      <div className="w-full md:w-1/4 text-center md:text-start">
        <h2 className="font-medium text-3xl xs:text-5xl md:text-3xl ld:text-4xl xl:text-5xl leading-snug">
          Our top Selling Product 2024
        </h2>
        <p className="mt-10 text-17 text-[#A8A8A8]">
          lacinia an, tincidunt risus ac, consequat velit. mos sodales suscipit
          tortor ditaemcos.
        </p>
        <p className="mt-8 text-17 text-[#A8A8A8]">Start From</p>
        <h4 className="text-3xl">
          AED 25.00{' '}
          <span className="text-2xl text-secondary-foreground ms-2 line-through">
            AED 30.00
          </span>
        </h4>
        <Button
        onClick={()=>{route.push("/products")}}
          variant={'default'}
          className="text-white text-2xl font-light mt-10 rounded-3xl w-56 h-16"
        >
          View More
        </Button>
      </div>
      <div className="w-full md:w-[73%]">
        <div className="my-12">
          <SliderComponent cards={products} cardHeight='xl:[420px]' sliderArrow={false} silderName='top-selling' isLoading={isProductsLoading} />
        </div>
      </div>
    </div>
  );
};

export default TopSelling;
