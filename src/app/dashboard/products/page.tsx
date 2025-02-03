import { fetchCategories, fetchProducts, fetchSubCategories } from "@/config/fetch";
import Product from "./Products";

const Productspage = async () => {
  const cetagories = await fetchCategories();
  const subcetagories = await fetchSubCategories();
  const products = await fetchProducts();
  return ( <Product cetagories={cetagories} productsData={products} subcetagories={subcetagories}  />  );
};

export default Productspage;
