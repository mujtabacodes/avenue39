import banner8 from '@images/banners/banner8.png';
import { HiOutlineShoppingBag } from 'react-icons/hi2';
import offerIcon from '@icons/pngegg.png';
import Image from 'next/image';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import { addItem } from '@/redux/slices/cart';
import { openDrawer } from '@/redux/slices/drawer';
import { CartItem } from '@/redux/slices/cart/types';
import { useQuery } from '@tanstack/react-query';
import { IProduct } from '@/types/types';
import { fetchProducts } from '@/config/fetch';
import { useEffect, useState } from 'react';

const ProductBanner = () => {
  const dispatch = useDispatch<Dispatch>();
const [cartProduct, setCartProduct] = useState<CartItem | undefined>();
const {
  data: products = [],
  error: productsError,
  isLoading: isProductsLoading,
} = useQuery<IProduct[], Error>({
  queryKey: ['products'],
  queryFn: fetchProducts,
});

useEffect(() => {
  const product = products.find((product) => product.name === 'Lincoln Leather Chair & Footstool');
  if (product) {
    const itemToAdd: CartItem = {
      ...product,
      quantity: 1,
    };
    setCartProduct(itemToAdd);
  }
}, [products]);

const handleAddToCard = (e: React.MouseEvent<HTMLElement>) => {
  e.stopPropagation();
  if (cartProduct) {
    dispatch(addItem(cartProduct));
    dispatch(openDrawer());
  }
};

  return (
    <div
      className="w-full h-[437px] px-9 py-12 flex items-center rounded-2xl"
      style={{
        backgroundImage: `url(${banner8.src})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <div>
        <Image src={offerIcon} alt="limited offer" className="w-32" />
        <p className="text-white text-20 font-light tracking-widest mt-4">
          Get Discount Up to 50%
        </p>
        <h1 className="text-white text-4xl font-normal max-w-sm">
          Lincoln{' '}
          <span className="font-bold">
            Leather <span className="font-semibold">Chair</span>
          </span>{' '}
          & Footstool
        </h1>
        <p className="text-white text-md font-light mt-4">
          AED {cartProduct?.discountPrice}
          <span className="ms-4 line-through text-sm text-white opacity-65">
           AED {cartProduct?.price}
          </span>
        </p>
        <button className="my-4 px-4 py-3 text-black bg-white border border-white  rounded-full flex items-center justify-center gap-2 hover:bg-primary hover:text-white" onClick={handleAddToCard}>
          <HiOutlineShoppingBag />
          <span className="mr-2 text-xs">Add to cart</span>
        </button>
      </div>
    </div>
  );
};

export default ProductBanner;
