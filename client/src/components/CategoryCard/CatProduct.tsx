
import React from 'react';
import Container from '../ui/Container';
import Card from '../ui/card';
import ProductGrid from './ProductGrid';
import { IProduct } from '@/types/types';
import ProductSkeleton from '../Skaleton/productSkeleton';
import Link from 'next/link';
interface ICatProduct {
  reverse?: boolean;
  CategoryName: string;
  products: IProduct[];
  landHeight?: string;
  portSpace?: string;
  sofaHeight?: string;
  sideTableHeight?: string;
  redirect?:string;
}
const CatProduct = ({ reverse, CategoryName, products , landHeight ,portSpace , sofaHeight ,sideTableHeight,redirect }: ICatProduct) => {
  console.log("Products array: ", products);

  return (
    <Container className="my-10">
      <div className='relative px-2 md:px-6 border-2 border-[#707070] rounded-[40px] sm:rounded-[87px]'>
        <Link href={`/products/${redirect}`} className="absolute -top-5 left-1/2 transform -translate-x-1/2 rounded-xl border bg-white xs:left-20 xs:transform-none hover:bg-black hover:text-white hover:border-black">
          <p className="px-2 md:text-3xl font-Helveticalight capitalize text-center">
            {CategoryName}
          </p>
        </Link>
        <div className={`mt-6 sm:mt-12 flex ${reverse ? 'flex-col-reverse' : 'flex-col'}`}>
          <div className={`grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:gap-8`}>
            {products.length < 1 && Array(5).fill(null).map((_, index) => (
              <ProductSkeleton imageHeight="h-[270px] xl:h-[290px]" key={index} />
            ))}
            <ProductGrid products={products.slice(0, 5)} CardComponent={Card} imageHeight="h-[270px] xl:h-[290px]" isHomepage={true} calculateHeight={sofaHeight} />
          </div>
          <div className="grid grid-cols-12 sm:gap-8">
            <div className={`col-span-12 md:col-span-6 xl:col-span-5 ${reverse ? 'order-2' : 'order-1'}`}>
              {products.length < 5 && (
                <ProductSkeleton imageHeight="h-[300px] xs:h-[580px] lg:h-[600px] xl:h-[834.46px]" />)}
              <ProductGrid products={products.slice(5, 6)} CardComponent={Card} slider={true} isLandscape={false} portSpace={portSpace} imageHeight="h-[300px] xs:h-[580px] lg:h-[600px] xl:h-[834.46px]" />
            </div>
            <div className={`col-span-12 md:col-span-6 xl:col-span-7 ${reverse ? 'order-1' : 'order-2'}`}>
              {products.length < 6 && (
                <ProductSkeleton imageHeight="h-[200px] xl:h-[345.15px]" />)}
              <ProductGrid products={products.slice(6, 7)} CardComponent={Card} slider={true} isLandscape={true} imageHeight="h-[200px] xl:h-[345.15px]" calculateHeight={landHeight} />
              <div className="grid grid-cols-1 xs:grid-cols-2 xl:grid-cols-3 sm:gap-8">
                {products.length < 7 && Array(3).fill(null).map((_, index) => (
                  <ProductSkeleton imageHeight="h-[210px] xl:h-[353.64px]" key={index} />
                ))}
                <ProductGrid products={products.slice(7, 10)} CardComponent={Card} isHomepage={true} imageHeight="h-[210px] xl:h-[356.64px]" calculateHeight={sideTableHeight ||'calc(100% - 10px)'} />
              </div>
            </div>
          </div>
        </div>

      </div>
    </Container>
  );
};
export default CatProduct;
