'use client';
import React from 'react';
import Tabs from '@/components/card-slider/tabs';
import Container from '../ui/Container';
import { useQuery } from '@tanstack/react-query';
import { ICategory, IProduct } from '@/types/types';
import { fetchCategories, fetchProducts } from '@/config/fetch';
import { slidersData } from '@/data';

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
  const slidersData2 = categories.map((category) => ({
    tabTitle: category.name,
    cards: products.filter((product) =>
      // @ts-ignore
      product.categories.some(
        // @ts-ignore
        (prodCategory) => prodCategory.id === category.id,
      ),
    ),
  }));
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
