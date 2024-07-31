'use client';
import TopHero from '@/components/top-hero';
import Container from '@/components/ui/Container';
import { cards } from '@/data';
import { productsbredcrumbs } from '@/data/data';
import MegaSale from '@/components/discount-banner/mega-sale';
import { ImList } from 'react-icons/im';
import { MdWindow } from 'react-icons/md';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Card from '@/components/ui/card';
import Services from '@/components/services/services';
import TopSelling from '@/components/top-selling/top-selling';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { BsFilterLeft } from 'react-icons/bs';
import SidebarFilter from '@/components/filters/sidebar-filter';
import { useState } from 'react';

const Products = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [sortOption, setSortOption] = useState<string>('default');

  const handleCategoryChange = (category: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(selectedCategories.filter((cat) => cat !== category));
    }
  };

  const handlePriceChange = ([start, end]: [number, number]) => {
    setPriceRange([start, end]);
  };

  const handleSortChange = (sort: string) => {
    setSortOption(sort);
  };

  const filteredCards = cards
    .filter((card) => {
      const inCategory = selectedCategories.length > 0 ? selectedCategories.includes(card.productType || '') : true;
      const inPriceRange = parseFloat(card.price.replace('$', '')) >= priceRange[0] && parseFloat(card.price.replace('$', '')) <= priceRange[1];
      return inCategory && inPriceRange;
    })
    .sort((a, b) => {
      if (sortOption === 'name') {
        return a.heading.localeCompare(b.heading);
      } else if (sortOption === 'max') {
        return parseFloat(b.price.replace('$', '')) - parseFloat(a.price.replace('$', ''));
      } else if (sortOption === 'min') {
        return parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', ''));
      }
      return 0;
    });

  return (
    <>
      <TopHero breadcrumbs={productsbredcrumbs} />
      <Container className="my-5 flex flex-col md:flex-row gap-4 md:gap-8">
        <div className="w-full md:w-2/6 lg:w-1/4 hidden md:block">
          <SidebarFilter onCategoryChange={handleCategoryChange} onPriceChange={handlePriceChange} />
        </div>
        <div className="w-full md:w-4/6 lg:w-3/4">
          <MegaSale />
          <div className="mt-4">
            <div className="flex items-center justify-between gap-4 px-2">
              <div className="md:hidden">
                <Sheet>
                  <SheetTrigger asChild>
                    <div className='flex gap-1 items-center'>
                      <span>Filter</span>
                      <BsFilterLeft size={25} />
                    </div>
                  </SheetTrigger>
                  <SheetContent className="pb-5 w-4/5 overflow-y-auto">
                    <div className="relative">
                      <SidebarFilter onCategoryChange={handleCategoryChange} onPriceChange={handlePriceChange} />
                    </div>
                    <div className="h-16 w-4/5 sm:max-w-sm border-t-2 fixed bottom-0 right-0 bg-white flex items-center justify-center gap-4">
                      <Button variant={'ghost'} className="underline">
                        Cancel
                      </Button>
                      <SheetTrigger asChild>
                        <Button variant={'default'} className="text-white">
                          Apply
                        </Button>
                      </SheetTrigger>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
              <p className="md:text-16 text-primary-foreground hidden md:block">
                Showing {filteredCards.length} results
              </p>
              <div className="flex items-center gap-2">
                <MdWindow size={25} />
                <ImList size={20} />
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
                      <SelectSeparator />
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mt-4">
            {filteredCards.map((card) => (
              <div key={card.id}>
                <Card card={card} />
              </div>
            ))}
          </div>
        </div>
      </Container>
      <div className="my-14 px-8 sm:px-4 md:px-0 relative">
        <div className='bg-lightbackground absolute top-0 right-0 w-1/2 h-full -z-[1] rounded-s-xl hidden md:block'></div>
        <Container>
          <TopSelling />
        </Container>
      </div>
      <Services />
    </>
  );
};

export default Products;
