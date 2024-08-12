import Image, { StaticImageData } from "next/image"
import Link from "next/link";
import { useEffect, useState } from "react";
import { Skeleton } from "./skeleton";


interface DiscountCardProps {
  productItems: Array<{ id: number; imageUrl: string | StaticImageData; title: string }>;
  showSkeleton?: boolean
}

const DiscountCard: React.FC<DiscountCardProps> = ({ productItems , showSkeleton}) => {
  const [loading, setLoading] = useState(true);
  const skeletonCount = 5;

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); 

    return () => clearTimeout(timer); 
  }, []);

  return (
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
              <div className='text-16 font-bold mt-3 pb-1 border-b-2 w-max border-black'>{item.title}</div>
            </Link>
          )) )}
        </div>
  )
}

export default DiscountCard