import { Suspense } from 'react';
import product from '../../../../public/images/product.jpg';
import ProductBanner from '@/components/discount-banner/product-banner';

import Shop from '../shop';
import { headers } from 'next/headers';
import { Metadata } from 'next';
import { ProductDetailSkeleton } from '@/components/product-detail/skelton';
import { fetchProducts } from '@/config/fetch';
import { menuData } from '@/data/menu';
import { ICategory, IProduct } from '@/types/types';

async function fetchCategory() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/category/get-all`,
    {
      next: { tags: ['category'] },
    },
  );

  if (!response.ok) {
    throw new Error('Failed to fetch category');
  }
  return response.json();
}
async function fetchSubCategory() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/subcategories/get-all`,
    {
      next: { tags: ['subcategories'] },
    },
  );

  if (!response.ok) {
    throw new Error('Failed to fetch subcategories');
  }
  return response.json();
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = params;
  const headersList = headers();
  const domain =
    headersList.get('x-forwarded-host') || headersList.get('host') || '';
  const protocol = headersList.get('x-forwarded-proto') || 'https';
  const fullUrl = `${protocol}://${domain}/product/${slug}`;

  const [categories, subcategories] = await Promise.all([fetchCategory(), fetchSubCategory()])

  const normalizedSlug = slug.toUpperCase().replace('-', ' ');

  const category = categories?.find(
    (item: any) => item.name === normalizedSlug,
  );
  console.log(category, 'category')
  const subcategory = !category
    ? subcategories?.find(
      (item: any) => item.name.toUpperCase() === normalizedSlug,
    )
    : null;

  const source = category || subcategory;
  const isCategory = !!category;

  const defaultTitle = `Avenue 39 ${isCategory ? 'Category' : 'subcategory'}`;
  const defaultDescription = `Welcome to Avenue 39 ${isCategory ? 'Category' : 'subcategory'}`;
  const defaultImageUrl = 'Avenue39';
  const defaultAltText = 'Avenue 39';

  const title = source?.meta_title || defaultTitle;
  const description = source?.meta_description || defaultDescription;
  const imageUrl = source?.posterImageUrl?.imageUrl || defaultImageUrl;
  const altText = source?.images_alt_text || defaultAltText;
  const canonicalTag = source?.canonical_tag || fullUrl;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: fullUrl,
      images: [
        {
          url: imageUrl,
          alt: altText,
        },
      ],
    },
    alternates: {
      canonical: canonicalTag,
    },
  };
}

const SingleProduct = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const [products, categories, subcategories] = await Promise.all([fetchProducts(), fetchCategory(), fetchSubCategory()])

  const categoryName =
    slug === 'lighting'
      ? 'Lighting'
      : slug === 'home-office'
        ? 'homeOffice'
        : slug;
        const subcategory = menuData[categoryName] || [];

        const sortProducts = products.map((prod) => {
          const matchingSubcategories = prod.subcategories?.map((sub) => {
            const foundSubcategory = subcategory.find((item) => item.title === sub.name);

            if (foundSubcategory) {
              return { id: 0, name: foundSubcategory.title };
            }
            return undefined;
          }).filter((item) => item !== undefined);
          
          prod.subcategories = matchingSubcategories;
        
          return prod;
        }).sort((a, b) => {
          if (!a.subcategories || a.subcategories.length === 0) return 1;
          if (!b.subcategories || b.subcategories.length === 0) return -1;
          
          const subcategoryA = a.subcategories?.[0]?.name || '';
          const subcategoryB = b.subcategories?.[0]?.name || '';
        
          const indexA = subcategory.findIndex((item) => item.title === subcategoryA);
          const indexB = subcategory.findIndex((item) => item.title === subcategoryB);
        
          return indexA - indexB;
        });
  return (
    <Suspense fallback={<ProductDetailSkeleton />}>
      <Shop
        sideBannerProduct="ashton-dining-chair"
        productBanner={<ProductBanner />}
        sideBanner={product}
        products={products}
        categories={categories}
        subcategories={subcategories}
        sortProducts={sortProducts}
        categoryName={slug}
      />
    </Suspense>
  );
};

export default SingleProduct;
