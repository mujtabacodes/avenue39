import Image, { StaticImageData } from "next/image"
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Skeleton } from "./skeleton";


interface DiscountCardProps {
  productItems: Array<{ id: number; imageUrl: string | StaticImageData; title: string }>;
  showSkeleton?: boolean
  
}

const DiscountCard: React.FC<DiscountCardProps> = ({ productItems, showSkeleton }) => {
  const [loading, setLoading] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [clickPrevented, setClickPrevented] = useState(false);

  const tabMenuRef = useRef<HTMLDivElement | null>(null);
  const skeletonCount = 5;

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const updateScrollIconsVisibility = () => {
    if (!tabMenuRef.current) return;
    const tabMenu = tabMenuRef.current;
    const scrollLeftValue = Math.ceil(tabMenu.scrollLeft);
    const scrollableWidth = tabMenu.scrollWidth - tabMenu.clientWidth;
  };

  const handleScroll = (direction: string) => {
    if (!tabMenuRef.current) return;
    const tabMenu = tabMenuRef.current;
    const scrollAmount = 150;

    if (direction === 'left') {
      tabMenu.scrollLeft -= scrollAmount;
    } else if (direction === 'right') {
      tabMenu.scrollLeft += scrollAmount;
    }

    setTimeout(() => updateScrollIconsVisibility(), 50);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!tabMenuRef.current) return;

    setIsDragging(true);
    setClickPrevented(false); // Assume no drag has occurred
    setStartX(e.pageX - tabMenuRef.current.offsetLeft);
    setScrollLeft(tabMenuRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !tabMenuRef.current) return;

    const x = e.pageX - tabMenuRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    
    if (Math.abs(walk) > 5) { // If moved more than 5px, consider it a drag
      setClickPrevented(true);
    }

    tabMenuRef.current.scrollLeft = scrollLeft - walk;
    updateScrollIconsVisibility();
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    updateScrollIconsVisibility();
    const tabMenu = tabMenuRef.current;

    const handleResize = () => {
      updateScrollIconsVisibility();
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [productItems]);

  return (
    <section
      className="px-4 pb-2 my-4 overflow-x-auto discount-product-wrapper custom-scroll cursor-ew-resize"
      ref={tabMenuRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUpOrLeave}
      onMouseLeave={handleMouseUpOrLeave}
    >
    <div className="flex gap-6 w-max mb-2">
       {loading && showSkeleton ? (
        Array.from({ length: skeletonCount }).map((_, index) => (
          <div className="flex flex-col " key={index}>
            <Skeleton className="w-[365px] h-[375px] rounded-md" /> 
            <Skeleton className="mt-2 w-44 h-6 rounded-md" />
          </div>
        ))
      ) : (
          productItems.map((item) => (
            <Link href="/products" key={item.id}>
              <Image src={item.imageUrl} alt="product image" className="w-full" />
              <div className='text-16 lg:text-[25px] font-bold mt-3 pb-1 border-b-2 w-max border-black'>{item.title}</div>
            </Link>
          )) )}
       </div>
      </section>
  )
}

export default DiscountCard