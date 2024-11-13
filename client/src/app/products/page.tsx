'use client'
import ProductPage from "@/components/product-page/product";
import { Fragment, useState } from "react";
import mega from '../../../public/images/mega.png'
import MegaSale from "@/components/discount-banner/mega-sale";

const Products = () => {
const [layout , Setlayout] = useState<string>('grid');

  return (
    <Fragment>
       <ProductPage sideBanner={mega} productBanner={<MegaSale />} layout={layout} Setlayout={Setlayout} />
    </Fragment>
  );
};

export default Products;
