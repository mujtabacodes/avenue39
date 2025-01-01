import { Suspense } from 'react';
import product from '../../../../public/images/product.jpg';
import ProductBanner from '@/components/discount-banner/product-banner';

import Shop from '../shop';
import { headers } from 'next/headers';
import { Metadata } from 'next';
import { ProductDetailSkeleton } from '@/components/product-detail/skelton';

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

  const categories = await fetchCategory();
  const subcategories = await fetchSubCategory();

  const normalizedSlug = slug.toUpperCase().replace('-', ' ');

  const category = categories?.find(
    (item: any) => item.name === normalizedSlug,
  );
  console.log(category,'category')
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

const SingleProduct = () => {
  return (
    <Suspense fallback={<ProductDetailSkeleton />}>
      <Shop
        sideBannerProduct="ashton-dining-chair"
        productBanner={<ProductBanner />}
        sideBanner={product}
      />
    </Suspense>
  );
};

export default SingleProduct;
