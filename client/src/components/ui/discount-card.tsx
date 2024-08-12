import Image, { StaticImageData } from "next/image"
import Link from "next/link";
import { useEffect, useState } from "react";
import { Skeleton } from "./skeleton";


interface DiscountCardProps {
  productItems: Array<{ id: number; imageUrl: string | StaticImageData; title: string }>;
}

const DiscountCard: React.FC<DiscountCardProps> = ({ productItems }) => {
  const [loading, setLoading] = useState(true);
  const skeletonCount = 5; // Adjust based on your design

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); 

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, []);

  return (
    <div className="flex gap-6 w-max mb-2">
       {loading ? (
        Array.from({ length: skeletonCount }).map((_, index) => (
          <div className="flex flex-col " key={index}>
            <Skeleton className="w-80 h-80 rounded-md" /> {/* Adjust size */}
            <Skeleton className="mt-2 w-44 h-6 rounded-md" /> {/* Adjust size */}
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
  )
}

export default DiscountCard