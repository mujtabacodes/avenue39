"use client"

import ProductPage from "@/components/product-page/product";
import { Fragment, useState } from "react";
import product from '../../../../public/images/product.jpg'
import ProductBanner from "@/components/discount-banner/product-banner";



const SingleProduct = () => {
  const [layout , Setlayout] = useState<string>('grid');

  return (

      <ProductPage sideBanner={product} sideBannerProduct='ashton-dining-chair' productBanner={<ProductBanner />}  layout={layout} Setlayout={Setlayout} />
  );
  };
  

export default SingleProduct