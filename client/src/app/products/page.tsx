import { Suspense } from "react";
import Shop from "./shop";
import MegaSale from "@/components/discount-banner/mega-sale";
import mega from '../../../public/images/mega.png'
import { Metadata } from "next";

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

const Products = () => {
  return (
    <Suspense>
      <Shop productBanner={<MegaSale />} sideBanner={mega} />
    </Suspense>
  );
};

export default Products;
