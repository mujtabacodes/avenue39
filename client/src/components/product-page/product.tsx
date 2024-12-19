import { useState, useEffect, ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import { usePathname, useSearchParams } from 'next/navigation';
import TopHero from '@/components/top-hero';
import Container from '@/components/ui/Container';
import { productsbredcrumbs } from '@/data/data';
import { ImList } from 'react-icons/im';
import { MdWindow } from 'react-icons/md';
import { BsFilterLeft } from 'react-icons/bs';
import { IoIosClose } from 'react-icons/io';
import {
  Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import {
  Sheet, SheetClose, SheetContent, SheetOverlay, SheetTrigger,
} from '@/components/ui/sheet';
import Card from '@/components/ui/card';
import LandscapeCard from '@/components/ui/landscape-card';
import Services from '@/components/services/services';
import TopSelling from '@/components/top-selling/top-selling';
import SidebarFilter from '@/components/filters/sidebar-filter';
import { Button } from '@/components/ui/button';
import CardSkaleton from '../Skaleton/productscard';
import { IProduct } from '@/types/types';
import { fetchProducts } from '@/config/fetch';
import { StaticImageData } from 'next/image';

interface ProductPageProps {
  sideBanner: StaticImageData | undefined;
  sideBannerProduct?: string;
  productBanner: ReactNode;
  layout: string;
  Setlayout: (layout: string) => void;
  fullUrl?: string;
}

const ProductPage = ({
  sideBanner,
  sideBannerProduct,
  productBanner,
  layout,
  Setlayout,
  fullUrl,
}: ProductPageProps) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState<string[]>([]);
  const [selectedCategoriesName, setSelectedCategoriesName] = useState<string | undefined>();
  const [selectedSubCategoriesName, setSelectedSubCategoriesName] = useState<string | undefined>();
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [sortOption, setSortOption] = useState<string>('default');
  const [category, setCategory] = useState<any[]>([]);
  const [filterLoading, setFilterLoading] = useState<boolean>(true);
  
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const fetchCategoryData = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/category/get-all`);
      if (!response.ok) throw new Error('Failed to fetch data');
      const data = await response.json();
      setCategory(data);
      setFilterLoading(false);
    } catch (error) {
      console.error(error);
      setFilterLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryData();
  }, []);

  useEffect(() => {
    const currentCategory = pathname.split('/').pop()?.toUpperCase().replace("-", " ");
    const categoryId = searchParams.get('id');
  
    const isInSubcategories = category.some((cat: { subcategories?: { name: string }[] }) =>
      cat.subcategories?.some((subcat: { name: string }) => subcat.name.toUpperCase() === currentCategory)
    );
  
    if (currentCategory) {
      if (categoryId) {
        const categoryMatch = category.find((cat: any) => cat.id.toString() === categoryId);
  
        if (categoryMatch) {
          setSelectedCategories([categoryMatch.name.toUpperCase()]);  
          if (categoryMatch.subcategories) {
            const subcategoryMatch = categoryMatch.subcategories.find((subcat: any) =>
              subcat.name.toUpperCase() === currentCategory
            );
            if (subcategoryMatch) {
              setSelectedSubCategories([`SUB_${subcategoryMatch.name.toUpperCase()}`]);
            }
          }
        }
      } else {
        if (
          currentCategory &&
          category.some((cat: { name: string }) => cat.name.toUpperCase() === currentCategory)
        ) {
          handleCategoryChange(currentCategory, true, false);
        } else if (currentCategory && isInSubcategories) {
          handleCategoryChange(currentCategory, true, true);
        }
      }
    }
  }, [pathname, category, searchParams]);
  

  const handleCategoryChange = (
    categoryOrSubCategory: string,
    isChecked: boolean,
    isSubCategory: boolean,
  ) => {
    setFilterLoading(true);
    const setter = isSubCategory ? setSelectedSubCategories : setSelectedCategories;
    setter(prev =>
      isChecked ? [...prev, categoryOrSubCategory] : prev.filter(cat => cat !== categoryOrSubCategory),
    );
    setTimeout(() => {
      setFilterLoading(false);
    }, 200)
  };

  const handlePriceChange = ([start, end]: [number, number]) => setPriceRange([start, end]);
  const handleSortChange = (sort: string) => setSortOption(sort);

  const { data: products = [], isLoading: isProductsLoading } = useQuery<IProduct[], Error>({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  setTimeout(() => {
    if(selectedSubCategories){
      setSelectedSubCategoriesName(selectedSubCategories.at(0))
    }
    if(selectedCategories){
      setSelectedCategoriesName(selectedCategories.at(0))
    }
  }, 200)
    


  const filteredCards = products
    .filter(card => {
      if (selectedSubCategories.length > 0) {
        return card.subcategories?.some(sub => selectedSubCategories.includes(`SUB_${sub.name.toUpperCase()}`));
      }
      return selectedCategories.length > 0
        ? card.categories?.some(cat => selectedCategories.includes(cat.name))
        : true;
    })
    .filter(card => {
      const priceToCheck = card.discountPrice > 0 ? card.discountPrice : card.price;
      return priceToCheck >= priceRange[0] && priceToCheck <= priceRange[1];
    })
    .sort((a, b) => {
      switch (sortOption) {
        case 'name':
          return a.name.trim().localeCompare(b.name.trim());
        case 'max':
          const priceA = a.discountPrice > 0 ? a.discountPrice : a.price;
          const priceB = b.discountPrice > 0 ? b.discountPrice : b.price;
          return priceB - priceA;
        case 'min':
          const minPriceA = a.discountPrice > 0 ? a.discountPrice : a.price;
          const minPriceB = b.discountPrice > 0 ? b.discountPrice : b.price;
          return minPriceA - minPriceB;
        default:
          return 0;
      }
    });


  return (
    <>
      <TopHero breadcrumbs={productsbredcrumbs} categoryName={selectedCategoriesName} subCategorName={selectedSubCategoriesName} />
      <Container className="my-5 flex flex-col md:flex-row gap-4 md:gap-8">
        {/* <div className="w-full md:w-2/6 lg:w-[392px] hidden md:block">
          <SidebarFilter
            onCategoryChange={handleCategoryChange}
            onPriceChange={handlePriceChange}
            sideBanner={sideBanner}
            category={category}
            sideBannerProduct={sideBannerProduct}
          />
        </div> */}
        {/* <div className="w-full md:w-4/6 lg:w-9/12"> */}
        <div className="w-full">
          {productBanner}
          <div className="sm:mt-4 mt-10 flex items-center justify-between gap-4 py-2 px-2">
            {/* <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <div className="flex items-center gap-1">
                    <span>Filter</span>
                    <BsFilterLeft size={25} />
                  </div>
                </SheetTrigger>
                <SheetOverlay className="bg-black opacity-80" />
                <SheetContent className="pb-5 pt-10 w-4/5 overflow-y-auto">
                  <SheetClose className="absolute left-4 top-4 rounded-sm opacity-100 transition-opacity hover:opacity-70 bg-black text-white">
                    <IoIosClose size={25} />
                  </SheetClose>
                  <SidebarFilter
                    onCategoryChange={handleCategoryChange}
                    onPriceChange={handlePriceChange}
                    sideBanner={sideBanner}
                    category={category}
                    sideBannerProduct={sideBannerProduct}
                  />
                  <div className="h-16 w-full fixed bottom-0 flex items-center justify-center bg-white border-t-2">
                    <Button variant="ghost" className="underline">
                      Cancel
                    </Button>
                    <SheetTrigger asChild>
                      <Button variant="default" className="text-white">
                        Apply
                      </Button>
                    </SheetTrigger>
                  </div>
                </SheetContent>
              </Sheet>
            </div> */}
            <p className="md:block hidden">Showing {!filterLoading && filteredCards.length > 0 ? filteredCards.length : 0} results</p>
            <div className="flex items-center gap-2">
              <MdWindow size={25} className="cursor-pointer" onClick={() => Setlayout('grid')} />
              <ImList size={20} className="cursor-pointer" onClick={() => Setlayout('list')} />
              <Select onValueChange={handleSortChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by: Default" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Sort Options</SelectLabel>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="max">Price Max</SelectItem>
                    <SelectItem value="min">Price Min</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          {(filterLoading || isProductsLoading) ? (
            <CardSkaleton />
          ) : (
            <div className={`grid gap-4 mt-4 ${layout === 'grid' ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
              {filteredCards.length > 0 ? (
                filteredCards.map(card => (
                  <div key={card.id}>
                    {layout === 'grid' ? (
                      <Card card={card} category isLoading={false} cardImageHeight="h-[350px] xsm:h-[500px] sm:h-[400px] md:h-[350px] 2xl:h-[400px]" />
                    ) : (
                      <LandscapeCard card={card} isLoading={false} />
                    )}
                  </div>
                ))
              ) : (
                <p>No Product Found</p>
              )}
            </div>
          )}
        </div>
      </Container>
    </>
  );
};

export default ProductPage;
