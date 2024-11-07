"use client"

import ProductPage from "@/components/product-page/product";
import { Fragment, useState } from "react";
import banner7 from '@images/banners/banner7.png'
import ProductBanner from "@/components/discount-banner/product-banner";



const SingleProduct = () => {
  const [layout , Setlayout] = useState<string>('grid');

  return (

      <ProductPage sideBanner={banner7} sideBannerProduct='ashton-dining-chair' productBanner={<ProductBanner />}  layout={layout} Setlayout={Setlayout} />
  );
  };
  

export default SingleProduct