'use client'
import ProductPage from "@/components/product-page/product";
import { Fragment } from "react";
import banner7 from '@images/banners/banner7.png'
import ProductBanner from "@/components/discount-banner/product-banner";

const SingleProduct = () => {
  return (
    <Fragment>
      <ProductPage sideBanner={banner7} productBanner={<ProductBanner />} />
    </Fragment>
  );
  };
  

export default SingleProduct