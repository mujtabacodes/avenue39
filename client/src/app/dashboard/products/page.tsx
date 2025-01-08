import { fetchCategories, fetchProducts } from "@/config/fetch";
import Product from "./Products";

const Productspage = async () => {
  const cetagories = await fetchCategories();
  const products = await fetchProducts();
  return ( <Product cetagories={cetagories} productsData={products}  />  );
};

export default Productspage;
