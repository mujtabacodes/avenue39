'use client';
import ProductPage from '@/components/product-page/product';
import React, { ReactNode, useState } from 'react';
import { ICategory, IProduct } from '@/types/types';

const Shop = ({
  productBanner,
  categories,
  ProductData,
  isCategory
}: {
  productBanner?: ReactNode;
  categories?: ICategory[];
  ProductData: IProduct[];
  isCategory?: boolean
}) => {
  const [layout, Setlayout] = useState<string>('grid');
  return (
    <>
      <ProductPage
        productBanner={productBanner}
        layout={layout}
        Setlayout={Setlayout}
        category={categories}
        ProductData={ProductData}
        isCategory={isCategory}
      />
    </>
  );
};

export default Shop;
