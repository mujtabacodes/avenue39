import { Suspense } from 'react';
// import product from '../../../../public/images/product.jpg';
import ProductBanner from '@/components/discount-banner/product-banner';

import Shop from '../../../components/Shop/shop';
import { headers } from 'next/headers';
import { Metadata } from 'next';
import { ProductDetailSkeleton } from '@/components/product-detail/skelton';
import { fetchCategories, fetchProducts, fetchSubCategories } from '@/config/fetch';
import { menuData } from '@/data/menu';
import { ICategory } from '@/types/types';

export async function generateMetadata({params}: {params: Promise<{ slug: string }>}): Promise<Metadata> {
  const { slug } = (await params);
  const headersList = await headers();
  const domain =
    headersList.get('x-forwarded-host') || headersList.get('host') || '';
  const protocol = headersList.get('x-forwarded-proto') || 'https';
  const fullUrl = `${protocol}://${domain}/product/${slug}`;

  const [categories, subcategories] = await Promise.all([fetchCategories(), fetchSubCategories()])

  const normalizedSlug = slug.toUpperCase().replace('-', ' ');

  const category: any = categories?.find(
    (item: any) => item.name === normalizedSlug,
  );
  const subcategory = !category ? subcategories?.find((item: any) => item.name.toUpperCase() === normalizedSlug,)
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


const SingleProduct = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const [products, categories] = await Promise.all([fetchProducts(), fetchCategories()])

  const categoryName = slug === 'lighting' ? 'Lighting' : slug === 'home-office' ? 'homeOffice' : slug;
  console.log(slug, "slug")
  const subcategory = menuData[categoryName] || []

  const sortProducts = [...products].map((prod) => {
    const clonedProd = { ...prod, subcategories: [...prod.subcategories] };
    const clonedSubcategories = clonedProd.subcategories ? JSON.parse(JSON.stringify(clonedProd.subcategories)) : [];

    const matchingSubcategories = clonedSubcategories?.map((sub: any) => {
      const foundSubcategory = subcategory?.find((item) => item.title === sub.name);

      if (foundSubcategory) {
        return { id: 0, name: foundSubcategory.title };
      }
      return undefined;
    }).filter((item: any) => item !== undefined);

    clonedProd.subcategories = matchingSubcategories;

    return clonedProd;
  }).sort((a, b) => {
    if (!a.subcategories || a.subcategories.length === 0) return 1;
    if (!b.subcategories || b.subcategories.length === 0) return -1;

    const subcategoryA = a.subcategories?.[0]?.name || '';
    const subcategoryB = b.subcategories?.[0]?.name || '';

    const indexA = subcategory.findIndex((item) => item.title === subcategoryA);
    const indexB = subcategory.findIndex((item) => item.title === subcategoryB);

    return indexA - indexB;
  });

    const normalizedSlug = categoryName?.toUpperCase().replace('-', ' ');
  
    const isCategory: boolean = categories?.some(
      (item: ICategory) => item.name === normalizedSlug,
    );
    const ProductData = isCategory ? sortProducts : products;
  return (
    <Suspense fallback={<ProductDetailSkeleton />}>
      <Shop
        productBanner={<ProductBanner />}
        categories={categories}
        ProductData={ProductData}
        isCategory={isCategory}
      />
    </Suspense>
  );
};

export default SingleProduct;
