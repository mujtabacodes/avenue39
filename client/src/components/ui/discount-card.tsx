import { discountProducts } from "@/data"
import Image from "next/image"

const DiscountCard: React.FC = () => {
  return (
    <div className="flex gap-6 w-max mb-2">
          {discountProducts.map((item) => (
            <div key={item.id} className="w-80">
              <Image src={item.imageUrl} alt="product image" className="w-full" />
              <div className='text-16 font-bold mt-2 pb-1 border-b-2 w-max border-black'>{item.title}</div>
            </div>
          ))}
        </div>
  )
}

export default DiscountCard