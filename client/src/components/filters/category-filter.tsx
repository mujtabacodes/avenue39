import { IProductCategories } from '@/types/types';
import React, { useEffect } from 'react';
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
  isSubcategory = false,
  selectedCategories = [], 
}: ICategoryFilter) => {
  const handleCheckboxChange = (e: CheckboxChangeEvent, itemName: string) => {
    const { checked } = e.target;
    onCategoryChange(itemName, checked, isSubcategory);
    console.log(checked, "checked");
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
                checked={selectedCategories.includes(item.name)} 
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
