'use client'
import ProductPage from "@/components/product-page/product";
import { Fragment } from "react";
import banner5 from '@images/banners/banner5.png'
import MegaSale from "@/components/discount-banner/mega-sale";

const Products = () => {


  return (
    <Fragment>
       <ProductPage sideBanner={banner5} productBanner={<MegaSale />} />
    </Fragment>
  );
};

export default Products;
