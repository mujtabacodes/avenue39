import { IProductCategory } from '@/types/types';
import React, { useEffect, useState } from 'react';
import { Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';

interface ICategoryFilter {
  items: IProductCategory[];
  /* eslint-disable */
  onCategoryChange: (
    category: string,
    isChecked: boolean,
    isSubCategory?: boolean,
  ) => void;
  /* eslint-enable */
  isSubcategory?: boolean;
  selectedCategories?: string[];
}
const CategoryFilter = ({
  items,
  onCategoryChange,
  isSubcategory,
  selectedCategories = [],
}: ICategoryFilter) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const handleCheckboxChange = (e: CheckboxChangeEvent, itemName: string) => {
    if (isSubcategory) {
      const { checked } = e.target;
      onCategoryChange(`SUB_${itemName.toUpperCase()}`, checked, isSubcategory);
    } else {
      const { checked } = e.target;
      onCategoryChange(itemName.toUpperCase(), checked, isSubcategory);
    }
  };
  useEffect(() => {
    if (isSubcategory) {
      setIsLoading(false);
      const timer = setTimeout(() => {
        setIsLoading(true);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setIsLoading(true);
    }
  }, [isSubcategory]);

  return (
    <>
      <h4 className="text-xl font-medium mb-5">
        {isSubcategory ? 'Subcategories' : 'Categories'}
      </h4>
      <div>
        <form className="flex flex-col gap-5 custom-scroll overflow-y-auto max-h-[280px]">
          {isLoading && items.length > 0
            ? items.map((item) => (
                <div className="flex items-center gap-2" key={item.id}>
                  <Checkbox
                    id={`${isSubcategory ? 'Subcategory' : 'Category'}${item.id}`}
                    className="custom-checkbox hover:border-black"
                    onChange={(e) => handleCheckboxChange(e, item.name)}
                    checked={
                      isSubcategory
                        ? selectedCategories.includes(
                            `SUB_${item.name.toUpperCase()}`,
                          )
                        : selectedCategories.includes(item.name.toUpperCase())
                    }
                  >
                    <span className="tracking-wide family-Helvetica text-13 lg:text-15 uppercase">
                      {item.name}
                    </span>
                  </Checkbox>
                  {!isSubcategory && (
                    <span className="bg-light px-[2px] font-semibold text-[10px] tracking-tight">
                      {item.totalItems}
                    </span>
                  )}
                </div>
              ))
            : Array(7)
                .fill(0)
                .map((_, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 animate-pulse"
                  >
                    <div className="w-5 h-5 bg-gray-300 rounded"></div>
                    <div className="w-full xsm:w-1/2 h-4 bg-gray-300 rounded"></div>
                  </div>
                ))}
        </form>
      </div>
    </>
  );
};

export default CategoryFilter;
