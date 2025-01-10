import React from 'react';
import { IProduct } from '@/types/types'; // Make sure this import is correct for your types

interface ProductGridProps {
  products: IProduct[]; // Array of products to render
  CardComponent: React.FC<any>; // The Card component to render each product
  imageHeight: string; // The height of the image
  slider?: boolean; // Whether
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, CardComponent, imageHeight,slider }) => {
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
        />
      ))}
    </>
  );
};

export default ProductGrid;
