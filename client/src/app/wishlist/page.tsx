'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import TopHero from '@/components/top-hero';
import { wishbredcrumbs } from '@/data/data';
import Container from '@/components/ui/Container';
import Counter from '@/components/Counter/Counter';
import { message, Modal } from 'antd';
import { addItem } from '@cartSlice/index';
import { CartItem } from '@cartSlice/types';
import { openDrawer } from '@/redux/slices/drawer';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { IoIosHeartEmpty } from 'react-icons/io';
import Link from 'next/link';
import { generateSlug } from '@/config';
import { MdModeEdit } from 'react-icons/md';
import { FaTrash } from 'react-icons/fa';
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
      const value = { ...product, posterposterImageUrl: product.posterImageUrl }
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
      {wishlist.length > 0 ? (

        wishlist.map((product, index) => (
          <Container className="grid grid-cols-12 gap-3  bg-white shadow my-5 items-center mt-2 py-2" key={index}>
            <div className="col-span-12 md:col-span-4 lg:col-span-4 xl:col-span-5 2xl:col-span-6">
              <div className="flex items-center gap-3">
                <Link href={`/products/${generateSlug(product.name)}`}>
                  <Image
                    className="w-[120px] h-[120px] rounded-md"
                    width={300}
                    height={300}
                    src={product.posterImageUrl}
                    alt={product.name}
                  />
                </Link>
                <div className="space-y-2 py-2 md:py-0">
                  <Link href={`/products/${generateSlug(product.name)}`}><span className="font-medium text-14 lg:text-16">{product.name}</span></Link>
                  <div className="block md:hidden space-y-2">
                    <div className=" flex items-center gap-4 ">
                      <p className="font-medium md:font-bold text-12 lg:text-xl xl:text-2xl">
                        AED{' '}
                        <span>
                          {product.discountPrice
                            ? product.discountPrice
                            : product.price}
                        </span>
                      </p>
                      {product.discountPrice && (
                        <p className="font-normal md:font-bold text-10 lg:text-md xl:text-lg line-through text-lightforeground">
                          AED <span>{product.price}</span>
                        </p>
                      )}
                      <div className='flex items-center gap-4'>
                        <Link href={`/product/${generateSlug(product.name)}`} >
                          <MdModeEdit
                            className="cursor-pointer"
                            size={20}
                          />
                        </Link>
                        <FaTrash
                          className="cursor-pointer"
                          size={15}
                          onClick={() => handleDeleteItem(product.id)}
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-4 items-center">
                      <Counter count={product.count} onChangeCount={(newCount) => handleCountChange(product.id, newCount)} />
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
              <Counter count={product.count} onChangeCount={(newCount) => handleCountChange(product.id, newCount)} />
            </div>
            <div className="hidden md:block md:col-span-3 lg:col-span-3 xl:col-span-3 2xl:col-span-3">
              <div className="flex items-center justify-evenly gap-1 lg:gap-4">
                <div className='flex items-center  gap-1 lg:gap-4'>
                  <p className="font-medium md:font-bold text-12 lg:text-xl xl:text-2xl">
                    AED{' '}
                    <span>
                      {product.discountPrice
                        ? product.discountPrice
                        : product.price}
                    </span>
                  </p>
                  {product.discountPrice > 0 && (
                    <p className="font-normal md:font-bold text-10 lg:text-md xl:text-lg line-through text-lightforeground">
                      AED <span>{product.price}</span>
                    </p>
                  )}
                </div>
                <div className='flex items-center gap-4'>
                  <Link href={`/product/${generateSlug(product.name)}`} >
                    <MdModeEdit
                      className="cursor-pointer"
                      size={20}
                    />
                  </Link>
                  <FaTrash
                    className="cursor-pointer"
                    size={15}
                    onClick={() => handleDeleteItem(product.id)}
                  />
                </div>
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
        ))
      ) : (
        <div className="flex justify-center items-center w-full h-96">
          <div className="flex flex-col gap-4 items-center">
            <IoIosHeartEmpty size={100} className="text-black" />
            <p className="font-medium text-2xl">No Items In Wishlist</p>
            <div className="">
              <Link
                href="/products"
                className="bg-[#F6F6F6] px-6 flex justify-center items-center  hover:border-[#666666] border-[#F6F6F6] text-[#666666] h-[73px]"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Wishlist;
