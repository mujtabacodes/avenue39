import NotFound from '@/app/not-found';
import CategoryProducts from '@/components/Category/CategoryProducts';
import SingleProduct from '@/components/Product/SingleProduct';
import SubCategoryProducts from '@/components/SubCategory/SubCategoryProducts';
import React from 'react'

interface SlugPageProps {
   params: Promise<{
     slug: string[];
   }>;
 }
const SlugPage: React.FC<SlugPageProps> = async ({params}) => {
   const {slug} = await params;
   
   if(slug.length === 1){
      return <CategoryProducts slug={slug} />
   } else if (slug.length === 2) {
      return <SubCategoryProducts slug={slug} />
   } else if (slug.length === 3) {
      return <SingleProduct slug={slug} />
   }
  return <NotFound />
}

export default SlugPage