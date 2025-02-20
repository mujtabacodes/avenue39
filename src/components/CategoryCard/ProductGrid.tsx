import React from 'react';
import { IProduct } from '@/types/types';
import { IProductsImage } from '@/types/interfaces';

interface ProductGridProps {
  products: IProduct[]; // Array of products to render
  CardComponent: React.FC<any>; // The Card component to render each product
  imageHeight: string; // The height of the image
  slider?: boolean; // Whether
  isHomepage?: boolean;
  isLandscape?: boolean;
  calculateHeight?: string;
  portSpace?: string;
  productImages: IProductsImage[];
  redirect?: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  productImages,
  CardComponent,
  imageHeight,
  slider,
  isHomepage,
  calculateHeight,
  portSpace,
  isLandscape,
  redirect,
}) => {
  console.log(products, 'products Floki');
  return (
    <>
      {products.map((product, index) => (
        <CardComponent
          key={index}
          card={product}
          category={true}
          isLoading={false}
          slider={slider}
          cardImageHeight={imageHeight}
          isHomepage={isHomepage}
          isLandscape={isLandscape}
          calculateHeight={calculateHeight}
          portSpace={portSpace}
          productImages={productImages}
          redirect={redirect}
        />
      ))}
    </>
  );
};

export default ProductGrid;
