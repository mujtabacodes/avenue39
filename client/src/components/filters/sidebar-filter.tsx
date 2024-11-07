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
    onCategoryChange(name, isChecked, isSubCategory);
    if (!isSubCategory) {
      setSelectedCategories((prev) =>
        isChecked ? [...prev, name] : prev.filter((cat) => cat !== name),
      );
    }
  };

  useEffect(() => {
    if (category && category.length > 0) {
      const currentCategory = pathname.split('/').pop()?.toUpperCase().replace("-"," "); 
      
      if (currentCategory) {
        setSelectedCategories((prev) => {
          if (!prev.includes(currentCategory)) {
            return [...prev, currentCategory];
          }
          return prev;
        });
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
          />
        </div>
        {subcategories.length > 0 && (
          <div className="border-t-2 py-6">
            <CategoryFilter
              items={subcategories}
              onCategoryChange={handleCategoryChange}
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
