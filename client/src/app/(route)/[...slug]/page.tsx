import NotFound from '@/app/not-found';
import CategoryPage from '@/components/Category/CategoryPage';
import SunCategoryPage from '@/components/SubCategory/page';
import React from 'react'

interface SlugPageProps {
   params: {
     slug: string[];
   };
 }
const SlugPage: React.FC<SlugPageProps> = async ({params}) => {
   const {slug} = await params;
   console.log(slug,'slug')
   if(slug.length === 1){
      return <CategoryPage name={slug[0]} />
   } else if (slug.length === 2) {
      return <SunCategoryPage name={slug[1]} />
   }
  return <NotFound />
}

export default SlugPage