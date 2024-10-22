'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import image from '@assets/images/Big image.png';
import TopHero from '@/components/top-hero';
import { wishbredcrumbs } from '@/data/data';
import Container from '@/components/ui/Container';
import { IoCloseSharp } from 'react-icons/io5';
import Counter from '@/components/Counter/Counter';
import { message, Modal } from 'antd';
import { addItem } from '@cartSlice/index';
import { CartItem } from '@cartSlice/types';
import { openDrawer } from '@/redux/slices/drawer';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { State } from '@/redux/store';
interface IProduct {
  id: string;
  name: string;
  price: number;
  discountPrice?: number | any;
  posterImageUrl: string;
  count: number;
}
const Wishlist = () => {
  const dispatch = useDispatch<Dispatch>();
  const cartItems = useSelector((state: State) => state.cart.items);
  const [wishlist, setWishlist] = useState<IProduct[]>([]);
  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setWishlist(storedWishlist);
  }, []);

  const handleCountChange = (id: string, newCount: number) => {
    const updatedWishlist = wishlist.map(item =>
      item.id === id ? { ...item, count: newCount } : item
    );
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };
  const handleDeleteItem = (id: string) => {
    Modal.confirm({
      title: 'Confirm Deletion',
      content: 'Are you sure you want to remove this product from your wishlist?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => {
        const updatedWishlist = wishlist.filter(item => item.id !== id);
        setWishlist(updatedWishlist);
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
        message.success('Product removed from Wishlist successfully!');
        window.dispatchEvent(new Event('WishlistChanged'));
      },
    });
  };

  const handleAddToCart = (product: IProduct) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItemIndex = cart.findIndex((item: IProduct) => item.id === product.id);
  
    // Check if the product already exists in the cart
    if (existingItemIndex !== -1) {
      // If it exists, just update the quantity
      cart[existingItemIndex].count += product.count;
    } else {
      // If it doesn't exist, add the product to the cart
      const value = {...product,posterposterImageUrl:product.posterImageUrl}
      const newItem = { ...value, count: product.count }; // Ensure count is set
      cart.push(newItem);
    }
  
    // Update local storage with the new cart
    localStorage.setItem('cart', JSON.stringify(cart));
  
    // Update wishlist by removing the added product
    const updatedWishlist = wishlist.filter(item => item.id !== product.id);
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    window.dispatchEvent(new Event('WishlistChanged'));
  
    // Add the item to the card through the dispatch
      //@ts-ignore
    const itemToAdd: CartItem = {
      ...product,
      quantity: product.count, // Set the quantity based on the product's count
    };
    dispatch(addItem(itemToAdd));
    dispatch(openDrawer());
  
    message.success('Product added to Cart successfully!');
  };
  
  
  return (
    <>
      <TopHero breadcrumbs={wishbredcrumbs} />
      {wishlist.map((product,index) => (
        <Container className="grid grid-cols-12 gap-3  bg-white shadow my-5 items-center mt-2 py-2" key={index}>
          <div className="col-span-12 md:col-span-4 lg:col-span-4 xl:col-span-5 2xl:col-span-6">
            <div className="flex items-center gap-3">
              <Image
                className="w-[120px] h-[120px] rounded-md"
                width={300}
                height={300}
                src={product.posterImageUrl}
                alt={product.name}
              />
              <div className="space-y-2 py-2 md:py-0">
                <p className="font-medium text-14 lg:text-16">{product.name}</p>
                <div className="block md:hidden space-y-2">
                  <div className=" flex items-center gap-4 ">
                    <p className="font-medium md:font-bold text-12 lg:text-xl xl:text-2xl">
                      AED.{' '}
                      <span>
                        {product.discountPrice
                          ? product.discountPrice
                          : product.price}
                      </span>
                    </p>
                    {product.discountPrice && (
                      <p className="font-normal md:font-bold text-10 lg:text-md xl:text-lg line-through text-lightforeground">
                        AED. <span>{product.price}</span>
                      </p>
                    )}
                    <IoCloseSharp
                      onClick={() => handleDeleteItem(product.id)}
                      className="cursor-pointer"
                      size={25}
                    />
                  </div>
                  <div className="flex flex-wrap gap-4 items-center">
                    <Counter count={product.count} onChangeCount={(newCount) => handleCountChange(product.id, newCount)}  />
                    <button
                      className="bg-main px-2 lg:px-4 py-2 rounded-md text-white w-fit"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden md:block md:col-span-3 lg:col-span-3 xl:col-span-2 2xl:col-span-2">
            <Counter count={product.count} onChangeCount={(newCount) => handleCountChange(product.id, newCount)}  />
          </div>
          <div className="hidden md:block md:col-span-3 lg:col-span-3 xl:col-span-3 2xl:col-span-3">
            <div className="flex items-center gap-1 lg:gap-4">
              <p className="font-medium md:font-bold text-12 lg:text-xl xl:text-2xl">
                AED.{' '}
                <span>
                  {product.discountPrice
                    ? product.discountPrice
                    : product.price}
                </span>
              </p>
              {product.discountPrice > 0 && (
                <p className="font-normal md:font-bold text-10 lg:text-md xl:text-lg line-through text-lightforeground">
                  AED. <span>{product.price}</span>
                </p>
              )}
              <IoCloseSharp
                onClick={() => handleDeleteItem(product.id)}
                className="cursor-pointer"
                size={25}
              />
            </div>
          </div>
          <div className="hidden md:block md:col-span-2 lg:col-span-2 xl:col-span-2 2xl:col-span-1">
            <button
              className="bg-main px-2 lg:px-4 py-2 rounded-md text-white w-fit"
              onClick={() => handleAddToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        </Container>
      ))}
    </>
  );
};

export default Wishlist;
