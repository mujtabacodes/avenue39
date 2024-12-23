import { Suspense } from 'react';
import Product from '../product';
import { IProduct, IProductDetail } from '@/types/types';
import { Metadata } from 'next';
import { headers } from 'next/headers';
import axios from 'axios';
import { ProductDetailSkeleton } from '@/components/product-detail/skelton';

async function fetchProducts() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/product/get-all`,
    {
      next: { tags: ['products'] },
    },
  );

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
}

async function fetchReviews() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/reviews/get-all`,
    {
      next: { tags: ['reviews'] },
    },
  );

  if (!response.ok) {
    throw new Error('Failed to fetch reviews');
  }
  return response.json();
}

const generateSlug = (text: string) => {
  const formatedSlug = text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');

  return formatedSlug;
};
export async function generateMetadata({
  params,
}: {
  params: { name: string };
}): Promise<Metadata> {
  const { name } = params;
  const headersList = headers();
  const domain =
    headersList.get('x-forwarded-host') || headersList.get('host') || '';
  const protocol = headersList.get('x-forwarded-proto') || 'https';
  const pathname = headersList.get('x-invoke-path') || '/';

  const fullUrl = `${protocol}://${domain}${pathname}`;

  const products = await fetchProducts();
  let Product = products?.find((item: any) => generateSlug(item.name) === name);
  let ImageUrl = Product?.posterImageUrl?.imageUrl || 'Avenue39';
  let alt = Product?.Images_Alt_Text || 'Avenue 39';

  let NewImage = [
    {
      url: ImageUrl,
      alt: alt,
    },
  ];
  let title = Product && Product.Meta_Title ? Product.Meta_Title : 'Avenue 39';
  let description =
    Product && Product.Meta_Description
      ? Product.Meta_Description
      : 'Welcome to Avenue 39';
  let url = `${fullUrl}product/${name}`;
  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: url,
      images: NewImage,
    },
    alternates: {
      canonical: Product && Product.Canonical_Tag ? Product.Canonical_Tag : url,
    },
  };
}

const ProductPage = async ({ params }: { params: IProductDetail }) => {
  const products = await fetchProducts();
  const reviews = await fetchReviews();
  const product = products.find((product: IProduct) => {
    return generateSlug(product.name) === params.name;
  });

  return (
    <Suspense fallback={<ProductDetailSkeleton />}>
      <Product params={params} reviews={reviews} product={product} />
    </Suspense>
  );
};

export default ProductPage;
