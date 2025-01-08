'use client';
import React from 'react';
import Tabs from '@/components/card-slider/tabs';
import Container from '../ui/Container';
import { useQuery } from '@tanstack/react-query';
import { ICategory, IProduct } from '@/types/types';
import { fetchCategories, fetchProducts } from '@/config/fetch';

const CardsTabes: React.FC = () => {
  const {
    data: products = [],
    error: productsError,
    isLoading: isProductsLoading,
  } = useQuery<IProduct[], Error>({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  const {
    data: categories = [],
    error: categoriesError,
    isLoading: isCategoriesLoading,
  } = useQuery<ICategory[], Error>({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });
  const desiredOrder = ['DINING', 'LIVING', 'BEDROOM', 'HOME OFFICE'];

  const slidersData2 = categories
    .sort((a, b) => {
      const indexA = desiredOrder.indexOf(a.name);
      const indexB = desiredOrder.indexOf(b.name);

      return (
        (indexA === -1 ? Infinity : indexA) -
        (indexB === -1 ? Infinity : indexB)
      );
    })
    .map((category) => ({
      tabTitle: category.name,
      cards: products.filter((product) =>
        // @ts-ignore
        product.categories.some(
          // @ts-ignore
          (prodCategory) => prodCategory.id === category.id,
        ),
      ),
    }));

  console.log('slidersData2', slidersData2);

  return (
    <Container>
      {productsError || categoriesError ? null : (
        <Tabs
          slidersData={slidersData2}
          isLoading={isProductsLoading || isCategoriesLoading}
        />
      )}
    </Container>
  );
};

export default CardsTabes;
