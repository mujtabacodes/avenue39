'use client';
import ProductPage from '@/components/product-page/product';
import React, { Fragment, ReactNode, useState } from 'react';
import { StaticImageData } from 'next/image';
import { ICategory, IProduct } from '@/types/types';

const Shop = ({
  sideBannerProduct,
  productBanner,
  sideBanner,
  products,
  // subcategories,
  // categories,
  sortProducts,
  categoryName
}: {
  sideBannerProduct?: string;
  productBanner?: ReactNode;
  sideBanner?: StaticImageData;
  subcategories: ICategory[];
  categories: ICategory[];
  products: IProduct[];
  sortProducts: IProduct[];
  categoryName: string
}) => {
  const [layout, Setlayout] = useState<string>('grid');
  return (
    <Fragment>
      <ProductPage
        sideBanner={sideBanner}
        productBanner={productBanner}
        layout={layout}
        Setlayout={Setlayout}
        sideBannerProduct={sideBannerProduct}
        products={products}
        // category={categories}
        // subcategories={subcategories}
        sortProducts={sortProducts}
        categoryName={categoryName}
      />
    </Fragment>
  );
};

export default Shop;
