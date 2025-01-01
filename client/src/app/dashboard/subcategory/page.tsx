import { fetchCategories, fetchSubCategories } from '@/config/fetch';
import SubCategoryComponent from './SubCategory';

const AddSubCategory = async () => {
const subCategories = await fetchSubCategories();
const cetagories = await fetchCategories();
  return (
    <SubCategoryComponent subCategories={subCategories} cetagories={cetagories} />
  );
};

export default AddSubCategory;
