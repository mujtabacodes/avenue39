import React from 'react';
import CatProduct from './CatProduct';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '@/config/fetch';
import { IProduct } from '@/types/types';
import CatProduct1 from './CatProduct1';
import { generateSlug } from '@/config';

const AllCategory = () => {
  const { data: products = [] } = useQuery<IProduct[], Error>({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  const filterByCategory = (products: IProduct[], categoryName: string) => {
    return products.filter((product) =>
      product.categories?.some((category) => generateSlug(category.name.toLowerCase()) === generateSlug(categoryName.toLowerCase()))
    );
  };

  return (
    <>
      <CatProduct
        products={filterByCategory(products, "Dining")}
        CategoryName="Shop Your Dining"
      />
      <CatProduct
        products={filterByCategory(products, "Living")}
        CategoryName="Shop Your Living"
        reverse
      />
      <CatProduct1
        products={filterByCategory(products, "Bedroom")}
        CategoryName="Shop your Bedroom"
      />
      <CatProduct1
        products={filterByCategory(products, "Accessories")}
        CategoryName="Complement your design with accessories"
        reverse
      />
    </>
  );
};

export default AllCategory;
