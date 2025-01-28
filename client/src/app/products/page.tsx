import { Suspense } from "react";
import Shop from "./shop";
import MegaSale from "@/components/discount-banner/mega-sale";
import mega from '../../../public/images/mega.png'
import { Metadata } from "next";
import { fetchCategories, fetchProducts, fetchSubCategories } from "@/config/fetch";

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

const Products = async() => {
// let products = await fetchProducts()
  const [products, categories, subcategories] = await Promise.all([fetchProducts(), fetchCategories(), fetchSubCategories()])

  
console.log(products, "products")

  return (
    <Suspense>
      <Shop productBanner={<MegaSale />}
       sideBanner={mega}
        products={products}       
        categories={categories}
        subcategories={subcategories} />
    </Suspense>
  );
};

export default Products;
