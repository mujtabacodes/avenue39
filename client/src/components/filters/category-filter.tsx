import { IProductCategories } from '@/types/types';
import React from 'react';
import { Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';

interface ICategoryFilter {
  items: IProductCategories[];
  onCategoryChange: (
    category: string,
    isChecked: boolean,
    isSubCategory?: boolean,
  ) => void;
  isSubcategory?: boolean;
  selectedCategories?: string[];
}

const CategoryFilter = ({
  items,
  onCategoryChange,
  isSubcategory,
  selectedCategories = [],
}: ICategoryFilter) => {
  const handleCheckboxChange = (e: CheckboxChangeEvent, itemName: string) => {
    if (isSubcategory) {
      const { checked } = e.target;
      onCategoryChange(itemName.toUpperCase(), checked, isSubcategory);
      // console.log(checked, 'checked', isSubcategory, itemName.toUpperCase());
    }
    else {
      const { checked } = e.target;
      onCategoryChange(itemName.toUpperCase(), checked, isSubcategory);
      // console.log(checked, 'checked', isSubcategory, itemName.toUpperCase());
    }

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
              <Checkbox
                id={`${isSubcategory ? 'Subcategory' : 'Category'}${item.id}`}
                className="custom-checkbox hover:border-black"
                onChange={(e) => handleCheckboxChange(e, item.name)}
                checked={isSubcategory ? selectedCategories.includes(item.name.toUpperCase()) : selectedCategories.includes(item.name.toUpperCase())}
              >
                <span className="text-16 uppercase">{item.name}</span>
              </Checkbox>
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
