import { useState, useEffect, ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import { usePathname, useSearchParams } from 'next/navigation';
import TopHero from '@/components/top-hero';
import Container from '@/components/ui/Container';
import { productsbredcrumbs } from '@/data/data';
import { ImList } from 'react-icons/im';
import { MdWindow } from 'react-icons/md';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Card from '@/components/ui/card';
import LandscapeCard from '@/components/ui/landscape-card';
import CardSkaleton from '../Skaleton/productscard';
import { IProduct } from '@/types/types';
import { fetchProducts } from '@/config/fetch';
import { StaticImageData } from 'next/image';
import SubCategoriesRow from './subcategories-row';
interface ProductPageProps {
  sideBanner: StaticImageData | undefined;
  sideBannerProduct?: string;
  productBanner: ReactNode;
  layout: string;
  Setlayout: React.Dispatch<React.SetStateAction<string>>;
  fullUrl?: string;
  sortProducts: IProduct[]
  categoryName?: string;
  products: IProduct[]
  homeProd?: IProduct[]
}

const ProductPage = ({
  productBanner,
  layout,
  Setlayout,
  sortProducts,
  categoryName,
  products,
  homeProd
}: ProductPageProps) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState<string[]>([]);
  const [selectedCategoriesName, setSelectedCategoriesName] = useState<
    string | undefined
  >();
  const [selectedSubCategoriesName, setSelectedSubCategoriesName] = useState<string | undefined>();
  const [sortOption, setSortOption] = useState<string>('default');
  const [category, setCategory] = useState<any[]>([]);
  const [filterLoading, setFilterLoading] = useState<boolean>(true);
  const pathname = usePathname();
  const searchParams = useSearchParams();


  const normalizedSlug = categoryName?.toUpperCase().replace('-', ' ');

  const isCategory: boolean = category?.some(
    (item: any) => item.name === normalizedSlug,
  );

  const fetchCategoryData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/category/get-all`,
      );
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
    const currentCategory = pathname
      .split('/')
      .pop()
      ?.toUpperCase()
      .replace('-', ' ');
    const categoryId = searchParams.get('id');

    const isInSubcategories = category.some(
      (cat: { subcategories?: { name: string }[] }) =>
        cat.subcategories?.some(
          (subcat: { name: string }) =>
            subcat.name.toUpperCase() === currentCategory,
        ),
    );

    if (currentCategory) {
      if (categoryId) {
        const categoryMatch = category.find(
          (cat: any) => cat.id.toString() === categoryId,
        );

        if (categoryMatch) {
          setSelectedCategories([categoryMatch.name.toUpperCase()]);
          if (categoryMatch.subcategories) {
            const subcategoryMatch = categoryMatch.subcategories.find(
              (subcat: any) => subcat.name.toUpperCase() === currentCategory,
            );
            if (subcategoryMatch) {
              setSelectedSubCategories([
                `SUB_${subcategoryMatch.name.toUpperCase()}`,
              ]);
            }
          }
        }
      } else {
        if (
          currentCategory &&
          category.some(
            (cat: { name: string }) =>
              cat.name.toUpperCase() === currentCategory,
          )
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
    const setter = isSubCategory
      ? setSelectedSubCategories
      : setSelectedCategories;
    setter((prev) =>
      isChecked
        ? [...prev, categoryOrSubCategory]
        : prev.filter((cat) => cat !== categoryOrSubCategory),
    );
    setTimeout(() => {
      setFilterLoading(false);
    }, 200);
  };

  const handleSortChange = (sort: string) => setSortOption(sort);

 

  setTimeout(() => {
    if (selectedSubCategories) {
      setSelectedSubCategoriesName(selectedSubCategories.at(0));
    }
    if (selectedCategories) {
      setSelectedCategoriesName(selectedCategories.at(0));
    }
  }, 200);
  const productdata = isCategory ? sortProducts : products

  const filteredCards = productdata.filter((card) => {
    if (pathname === '/products') {
      return card.discountPrice > 0 && card.stock > 0;
    }
    return true;
  })
  .filter((card) => {
    if (selectedSubCategories.length > 0) {

      return card.subcategories?.some((sub) =>
        selectedSubCategories.includes(`SUB_${sub.name.toUpperCase()}`),
      );
    } 
    return selectedCategories.length > 0 ? card.categories?.some((cat) => selectedCategories.includes(cat.name)) : true
  
  })
  .sort((a, b) => {
    switch (sortOption) {
      case 'name': {
        return a.name.trim().localeCompare(b.name.trim());
      }
      case 'max': {
        const priceA = a.discountPrice > 0 ? a.discountPrice : a.price;
        const priceB = b.discountPrice > 0 ? b.discountPrice : b.price;
        return priceB - priceA;
      }
      case 'min': {
        const minPriceA = a.discountPrice > 0 ? a.discountPrice : a.price;
        const minPriceB = b.discountPrice > 0 ? b.discountPrice : b.price;
        return minPriceA - minPriceB;
      }
      default:
        return 0;
    }
  });

  console.log(filteredCards,"filteredCards", productdata)
  return (
    <>
      <TopHero
        breadcrumbs={productsbredcrumbs}
        categoryName={selectedCategoriesName}
        subCategorName={selectedSubCategoriesName}
      />
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

          <div className="sm:mt-4 mt-10 flex items-center justify-between gap-4 py-2 px-2 flex-col md:flex-row">
            <div className="flex items-center gap-4">
    
              <div className='flex gap-2 items-center'>
           
           <Select onValueChange={handleSortChange}>
             <SelectTrigger>
               <SelectValue placeholder="Sort by: Default" />
             </SelectTrigger>
             <SelectContent>
               <SelectGroup>
                 <SelectItem value="default">Default</SelectItem>
                 <SelectItem value="name">Name</SelectItem>
                 <SelectItem value="max">Price Max</SelectItem>
                 <SelectItem value="min">Price Min</SelectItem>
               </SelectGroup>
             </SelectContent>
           </Select>
           <MdWindow  className="cursor-pointer text-3xl" onClick={() => Setlayout('grid')} />
           <ImList  className="cursor-pointer text-2xl" onClick={() => Setlayout('list')} />
          </div>
           <p className="block whitespace-nowrap">Showing {!filterLoading && filteredCards.length > 0 ? filteredCards.length : 0} results</p>
         </div>

            <SubCategoriesRow />
          </div>
          {filterLoading 
          // || 
          // isProductsLoading
          
          ? (
            <CardSkaleton />
          ) : (
            
            <div className={`grid gap-4 md:gap-8 mt-4 ${layout === 'grid' ? 'grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-5 ' : 'grid-cols-1'}`}>
              {filteredCards.length > 0 ? (
                filteredCards.map((card) => (
                  <div key={card.id} className='flex'>
                    {layout === 'grid' ? (
                      <Card card={card} category isLoading={false} cardImageHeight="h-[300px] xsm:h-[220px] sm:h-[400px] md:h-[350px] xl:h-[220px] 2xl:h-[280px] w-full" />
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
