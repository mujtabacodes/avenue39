import { Suspense } from "react";
import Shop from "../../components/Shop/shop";
import MegaSale from "@/components/discount-banner/mega-sale";
// import mega from '../../../public/images/mega.png'
import { Metadata } from "next";
import { fetchProducts } from "@/config/fetch";
import { ProductDetailSkeleton } from "@/components/product-detail/skelton";

export const metadata: Metadata = {
  title: 'Sale Page',
  description: 'Sale description',
  openGraph: {
    title: 'Sale',
    description: 'Sale description',
    url: 'fullUrl',
    images: [
      {
        url: 'imageUrl',
        alt: 'altText',
      },
    ],
  },
  alternates: {
    canonical: 'products',
  },

}

const Products = async () => {
  const products = await fetchProducts();
  return (
    <Suspense fallback={<ProductDetailSkeleton />}>
      <Shop productBanner={<MegaSale />}
        ProductData={products}
      />

    </Suspense>
  );
};

export default Products;
