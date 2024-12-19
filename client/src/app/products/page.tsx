import { Suspense } from "react";
import Shop from "./shop";
import MegaSale from "@/components/discount-banner/mega-sale";
import mega from '../../../public/images/mega.png'

const Products = () => {
  return (
    <Suspense>
      <Shop productBanner={<MegaSale />} sideBanner={mega} />
    </Suspense>
  );
};

export default Products;
