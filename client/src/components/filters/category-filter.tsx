import { IProductCategories } from '@/types/types';
import React from 'react';

interface ICategoryFilter {
  items: IProductCategories[];
  onCategoryChange: (
    category: string,
    isChecked: boolean,
    isSubCategory?: boolean,
  ) => void;
  isSubcategory?: boolean;
}

const CategoryFilter = ({
  items,
  onCategoryChange,
  isSubcategory = false,
}: ICategoryFilter) => {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    onCategoryChange(value, checked, isSubcategory); // Pass isSubcategory as the third argument
  };

  return (
    <>
      <h4 className="text-xl font-medium mb-5">
        {isSubcategory ? 'Subcategories' : 'Categories'}
      </h4>
      <div>
        <form className="flex flex-col gap-5 custom-scroll overflow-y-auto max-h-[280px]">
          {items.map((item) => (
            <div className="flex items-center gap-2" key={item.id}>
              <input
                type="checkbox"
                name="filter"
                id={`${isSubcategory ? 'Subcategory' : 'Category'}${item.id}`}
                value={item.name}
                className="rounded-none border-1 border-black w-4 h-4"
                onChange={handleCheckboxChange}
              />
              <label
                htmlFor={`${isSubcategory ? 'Subcategory' : 'Category'}${item.id}`}
                className="text-16 uppercase"
              >
                {item.name}
              </label>
              {!isSubcategory && (
              <span className="bg-light px-[2px] font-semibold text-[10px] tracking-tight">
                {item.totalItems}
              </span>
              )}
            </div>
          ))}
        </form>
      </div>
    </>
  );
};

export default CategoryFilter;
