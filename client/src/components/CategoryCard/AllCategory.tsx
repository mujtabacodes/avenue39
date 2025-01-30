'use client'
import React from 'react';
import CatProduct from './CatProduct';
import { IProduct } from '@/types/types';
import CatProduct1 from './CatProduct1';
import { generateSlug } from '@/config';
import { Accessories, Bedroom, Dining, Living } from '@/data/data';

const AllCategory = ({products}: {products: IProduct[]}) => {
  const filterByCategoryAndTitle = (
    products: IProduct[],
    categoryName: string,
    titles: string[]
  ) => {
    const filteredProducts = products.filter(
      (product) =>
        product.categories?.some(
          (category) =>
            generateSlug(category.name.toLowerCase()) ===
            generateSlug(categoryName.toLowerCase())
        ) && titles.includes(product.name)
    );
    return filteredProducts.sort(
      (a, b) => titles.indexOf(a.name) - titles.indexOf(b.name)
    );
  };
 console.log(filterByCategoryAndTitle(products, 'Living', Living) , 'Living');
  return (
    <div className='pt-1'>
      <CatProduct products={filterByCategoryAndTitle(products, 'Dining', Dining)} CategoryName='Shop Your Dining' redirect='dining'/>
      <CatProduct products={filterByCategoryAndTitle(products, 'Living', Living)} CategoryName='Shop Your Living'  reverse landHeight={'calc(100% - 80px)'} portSpace='px-8' sofaHeight={'calc(100% - 60px)'} sideTableHeight={'calc(100% - 20px)'} redirect='living' />
      <CatProduct1 products={filterByCategoryAndTitle(products, 'Bedroom', Bedroom)} CategoryName='Shop your Bedroom'  redirect='bedroom'/>
      <CatProduct1 products={filterByCategoryAndTitle(products, 'Accessories', Accessories)} CategoryName='Complement your design with accessories' reverse
       redirect='accessories' />
    </div>
  );
};

export default AllCategory;
