
import React from 'react';
import Container from '../ui/Container';
import Card from '../ui/card';
import ProductGrid from './ProductGrid';
import { IProduct } from '@/types/types';
import ProductSkeleton from '../Skaleton/productSkeleton';
interface ICatProduct {
  reverse?: boolean;
  CategoryName: string;
  products: IProduct[];
}
const CatProduct = ({ reverse, CategoryName, products }: ICatProduct) => {
  return (
    <Container className="my-10">
      <div className='relative p-2 md:p-4 border-2 border-[#707070] rounded-[87px]'>
        <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 rounded-xl border bg-white xs:left-20 xs:transform-none">
          <p className="px-2 md:text-3xl font-Helveticalight capitalize text-center">
            {CategoryName}
          </p>
        </div>
        <div className={`my-10 flex ${reverse ? 'flex-col-reverse' : 'flex-col'}`}>
          <div className={`grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:gap-8`}>
            {products.length < 1 && Array(5).fill(null).map((_, index) => (
              <ProductSkeleton imageHeight="h-[270px] xl:h-[290px]" key={index} />
            ))}
            <ProductGrid products={products.slice(0, 5)} CardComponent={Card} imageHeight="h-[270px] xl:h-[290px]" />
          </div>
          <div className="grid grid-cols-12 sm:gap-8">
            <div className={`col-span-12 md:col-span-6 xl:col-span-5 ${reverse ? 'order-2' : 'order-1'}`}>
              {products.length < 1 && (
                <ProductSkeleton imageHeight="h-[300px] xs:h-[580px] lg:h-[600px] xl:h-[834.46px]" />)}
              <ProductGrid products={products.slice(25, 26)} CardComponent={Card} slider={true} imageHeight="h-[300px] xs:h-[580px] lg:h-[600px] xl:h-[834.46px]" />
            </div>
            <div className={`col-span-12 md:col-span-6 xl:col-span-7 ${reverse ? 'order-1' : 'order-2'}`}>
              <ProductGrid products={products.slice(26, 27)} CardComponent={Card} slider={true} imageHeight="h-[200px] xl:h-[345.15px]" />
              <div className="grid grid-cols-1 xs:grid-cols-2 xl:grid-cols-3 sm:gap-8">
                <ProductGrid products={products.slice(0, 3)} CardComponent={Card} imageHeight="h-[210px] xl:h-[356.64px]" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </Container>
  );
};
export default CatProduct;
