import NotFound from '@/app/not-found';
import Shop from '@/components/Shop/shop';
import { generateSlug } from '@/config';
import { fetchCategories, fetchProducts } from '@/config/fetch';
import { IProduct } from '@/types/types';
import React from 'react'
import ProductBanner from '../discount-banner/product-banner';

const SubCategoryProducts = async ({slug}: {slug: string[]}) => {
  const categoryName = slug[0];
  const subcategoryName = slug[1];
  const [products, categories ] = await Promise.all([fetchProducts(), fetchCategories()])
  const findCategory = categories.find((item) => generateSlug(item.name) === categoryName);
  const findSubCategory = findCategory?.subcategories?.find((item) => generateSlug(item.name) === subcategoryName);
     if (!findCategory || !findSubCategory) {
        return <NotFound />
     }
  const filterProducts = products.filter((prod: IProduct) => {
    const category = prod.categories?.some((item) => item.id === findCategory.id);
    const subcategory = prod.subcategories?.some((item) => item.id === findSubCategory.id);
    return category && subcategory;
  })
  console.log(filterProducts,'filterProducts')

  return (
    <Shop productBanner={<ProductBanner subCategoriesName={findSubCategory.name} />} ProductData={filterProducts} categories={categories} isCategory={false} selectedCategoriesName={findCategory.name} selectedSubCategoriesName={findSubCategory.name} />
  )
}

export default SubCategoryProducts