import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';  
import CategoryFilter from './category-filter';
import { saleitems } from '@/data';
import { Slider, SliderPrimitive } from '@/components/ui/slider';
import Salecard from '../ui/sale-card';
import Image, { StaticImageData } from 'next/image';
import { IProductCategories } from '@/types/types';
import Link from 'next/link';

interface SidebarFilterProps {
  onCategoryChange: (category: string, isChecked: boolean, isSubCategory: boolean) => void;
  onPriceChange: (range: [number, number]) => void;
  sideBanner: StaticImageData;
  category: any;
  sideBannerProduct?: string;
}

const SidebarFilter = ({
  onCategoryChange,
  onPriceChange,
  sideBanner,
  sideBannerProduct,
  category,
}: SidebarFilterProps) => {
  const [range, setRange] = useState<[number, number]>([0, 500]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [subcategories, setSubcategories] = useState<IProductCategories[]>([]);
  const pathname = usePathname();

  const handleValueChange = ([start, end]: [number, number]) => {
    setRange([start, end]);
    onPriceChange([start, end]);
  };

  const handleCategoryChange = (name: string, isChecked: boolean, isSubCategory = false) => {
    onCategoryChange(name.toUpperCase(), isChecked, isSubCategory);
  
    if (!isSubCategory) {
      // Main category handling
      setSelectedCategories((prev) => {
        if (isChecked) {
          return [...prev, name];  // Add category if checked
        } else {
          return prev.filter((cat) => cat.toUpperCase() !== name);  // Remove category if unchecked
        }
      });
    } else {
      // Subcategory handling
      setSelectedCategories((prev) => {
        const updatedCategories = [...prev];
        const categoryIndex = updatedCategories.findIndex((cat) => cat.toUpperCase() === name);
        console.log(updatedCategories, 'updatedCategories')
        if (isChecked && categoryIndex === -1) {
          updatedCategories.push(name.toUpperCase()); // Add subcategory if checked
        } else if (!isChecked && categoryIndex !== -1) {
          updatedCategories.splice(categoryIndex, 1); // Remove subcategory if unchecked
        }
        return updatedCategories;
      });
    }
  };

  useEffect(() => {
    if (category && category.length > 0) {
      const currentCategory = pathname.split('/').pop()?.toUpperCase().replace("-", " "); 
      console.log("aCTUAL", currentCategory)

      if (currentCategory) {
        // Check if currentCategory matches any main category name
        const mainCategoryMatch = category.find((cat: any) => cat.name.toUpperCase() === currentCategory);
        console.log("mainCategoryMatch", mainCategoryMatch)

        if (mainCategoryMatch) {
          // If it matches a main category, check it
          setSelectedCategories((prev) => {
            if (!prev.includes(currentCategory)) {
              return [...prev, currentCategory];
            }
            return prev;
          });
          console.log("Selected categories: ", selectedCategories)
        } else {
          // If it doesn't match a main category, check if it's a subcategory
          category.forEach((cat: any) => {
            const subCategoryMatch = cat.subcategories?.find((subcat: any) => subcat.name.toUpperCase() === currentCategory);
            if (subCategoryMatch) {
              // Check both the main category and subcategory
              setSelectedCategories((prev) => {
                if (!prev.includes(cat.name)) {
                  return [...prev, cat.name, currentCategory];
                }
                return prev.includes(currentCategory) ? prev : [...prev, currentCategory];
              });
              console.log("Selected categories: ", selectedCategories)
            }
          });
        }
      }
    }
  }, [pathname, category]);

  useEffect(() => {
    if (selectedCategories.length > 0 && category.length > 0) {
      const selectedSubcategories = selectedCategories.flatMap((catName) => {
        const categoryObj = category.find((cat: any) => cat.name === catName);
        return categoryObj ? categoryObj.subcategories : [];
      });
      
      setSubcategories(selectedSubcategories);
    }
    else{
      setSubcategories([]);
    }
  }, [selectedCategories, category]);

  return (
    <div>
      <div className="w-full">
        <h3 className="py-5 text-xl font-medium">Filter</h3>
        <div className="border-t-2 py-6">
          <CategoryFilter
            items={category}
            onCategoryChange={handleCategoryChange}
            selectedCategories={selectedCategories}
            isSubcategory={false}
          />
        </div>
        {subcategories.length > 0 && (
          <div className="border-t-2 py-6">
            <CategoryFilter
              items={subcategories}
              onCategoryChange={handleCategoryChange}
              selectedCategories={selectedCategories}
              isSubcategory={true}
            />
          </div>
        )}
        <div className="border-t-2 py-6">
          <h4 className="text-xl font-medium mb-5">Prices</h4>
          <div>
            <Slider
              defaultValue={[1, 500]}
              max={500}
              step={1}
              onValueChange={handleValueChange}
            >
              <SliderPrimitive.Thumb />
              <SliderPrimitive.Thumb />
            </Slider>
            <div className="flex justify-between mt-2">
              {range.map((item, index) => (
                <span className="text-14 font-medium" key={index}>
                  AED {item}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-4">
          <h4 className="text-2xl font-semibold mb-5">Pay Your Way</h4>
          <div className="flex justify-center flex-wrap xs:flex-nowrap gap-2 xs:gap-4 px-1 xs:px-2">
            {saleitems.map((item) => (
              <Salecard key={item.id} cards={item} />
            ))}
          </div>
          <div className="mt-10">
            <Link href={sideBannerProduct ? `/product/${sideBannerProduct}` : '/products'}>
              <Image src={sideBanner} alt="sale banner" className="mx-auto" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarFilter;
