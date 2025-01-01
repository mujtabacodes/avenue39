import { Metadata } from "next";
import Cart from "./Cart";

export const metadata: Metadata = {
  title: 'Cart Page',
  description: 'Cart description',
  openGraph: {
    title: 'Cart',
    description: 'Cart description',
    url: 'fullUrl',
    images: [
      {
        url: 'imageUrl',
        alt: 'altText',
      },
    ],
  },
  alternates: {
    canonical: 'cart',
  },
}

const Cartpage = () => {
  return (
    <Cart />
  );
}

export default Cartpage;
