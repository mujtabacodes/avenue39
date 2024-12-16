

'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { State, Dispatch } from '@redux/store';
import {
  addItem,
  removeItem,
  selectTotalPrice,
  updateItemQuantity,
} from '@cartSlice/index';
import { CartItem } from '@cartSlice/types';
import { NormalText, ProductName, ProductPrice } from '@/styles/typo';
import { RxCross2 } from 'react-icons/rx';
import Image from 'next/image';
import CustomButtom from '../ui/custom-button';
import Counter from '../counter';
import { IoBagOutline, IoCloseSharp } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';
import { TfiClose } from 'react-icons/tfi';
import { generateSlug, TotalProducts } from '@/config';
import { closeDrawer, openDrawer } from '@/redux/slices/drawer';
import { FaTrash } from 'react-icons/fa';
import { MdModeEdit } from 'react-icons/md';
import Link from 'next/link';

interface ICartItems {
  isCartPage?: boolean;
  isCheckoutPage?: boolean;
}

const CartItems = ({ isCartPage, isCheckoutPage }: ICartItems) => {
  const navigate = useRouter();
  const dispatch = useDispatch<Dispatch>();
  const cartItems = useSelector((state: State) => state.cart.items);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const totalPrice = useSelector((state: State) =>
    selectTotalPrice(state.cart),
  );
  const drawerState = useSelector((state: State) => state.drawer);

  const removeProductFromCart = (id: number) => {
    dispatch(removeItem(id));
  };

  const handleCloseDrawer = () => {
    dispatch(closeDrawer());
  };

  const handleOpenDrawer = () => {
    dispatch(openDrawer());
  };

  const updateProductQuantity = (id: number, quantity: number) => {
    if (quantity > 0) {
      dispatch(updateItemQuantity({ id, quantity }));
    }
  };
  const handleenterDrawer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };
  const handleleaveDrawer = () => {
    if (timeoutRef.current) {
      timeoutRef.current = setTimeout(() => {
        dispatch(closeDrawer());
      }, 3000);
    }
  };
  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      dispatch(closeDrawer());
    }, 3000);
  }, [drawerState, dispatch]);

  return (
    <React.Fragment>
      {!isCartPage ? (
        <Sheet open={drawerState}>
          <SheetTrigger asChild>
            <div
              className={`xl:w-14 w-12 h-10 rounded-3xl relative flex justify-center items-center  cursor-pointer ${cartItems.length > 0 ? 'text-white bg-main' : 'text-black  border-black'}`}
              onClick={handleOpenDrawer}
            >
              <IoBagOutline size={25} />
              {cartItems.length > 0 && (
                <div className="w-4 h-4 rounded-full bg-black text-white flex justify-center items-center absolute top-2 right-2 text-10">
                  <TotalProducts />
                </div>
              )}
            </div>
          </SheetTrigger>
          <SheetOverlay
            className="bg-white opacity-80 z-[51]"
            onClick={handleCloseDrawer}
          />
          <SheetContent className="w-[90%] xsm:max-w-lg z-[52] border-s border-b h-[70vh] border-black py-5 xsm:py-10 ps-5 xs:ps-10 pe-0 flex flex-col" onMouseEnter={handleenterDrawer} onMouseLeave={handleleaveDrawer}>
            <SheetHeader className="space-y-0 flex flex-row items-center justify-between border-b-2 pb-6 relative pe-6">
              <SheetTitle className="font-medium text-3xl">
                My Cart (<TotalProducts />)
              </SheetTitle>
              <SheetClose
                onClick={handleCloseDrawer}
              >
                <TfiClose size={25} />
              </SheetClose>
            </SheetHeader>

            <div className="flex-1 overflow-auto mr-6 scrollbar-hidden">
              <ul className="space-y-4">
                {cartItems.map((item: any) => (
                  <li
                    key={item.id}
                    className="relative flex items-center bg-slate-50 border-dotted gap-3 p-4 w-full rounded-md"
                  >
                    <div className='w-[70px] h-[70px]'>
                      <Image
                        src={item.posterImageUrl}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="rounded-md w-full min-w-[70px] h-full"
                      />
                    </div>

                    <div className='grow'>
                      <ProductName className="text-start !text-[16px]">
                        {item.name}
                      </ProductName>
                      <div className="flex justify-between flex-wrap gap-2">
                        <span> Qty: {item.quantity}</span>
                        {item?.discountPrice > 0 ? (<ProductPrice className="flex gap-2 flex-wrap mb-4 !text-[15px] text-nowrap">
                          <span>
                            AED {item?.discountPrice * item.quantity}
                          </span>
                          <NormalText className="text-slate-400 line-through w-[70px] text-end text-nowrap !text-[15px]">
                            AED {item?.price * item.quantity}
                          </NormalText>
                        </ProductPrice>) :
                          (<ProductPrice className="flex gap-2 flex-wrap mb-4 !text-[15px] text-nowrap">
                            <span>
                              AED {item?.price * item.quantity}
                            </span>
                            {/* <NormalText className="text-slate-400 line-through w-20 text-end text-nowrap !text-[15px]">

                            </NormalText> */}
                          </ProductPrice>)}

                      </div>
                      <div
                        className="absolute top-2 right-2 cursor-pointer"
                        onClick={() => removeProductFromCart(item.id)}
                      >
                        <RxCross2 />
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <SheetFooter className="border-t-2 py-4 mr-6">
              <div className="flex flex-col gap-2 w-full">
                <NormalText className="text-slate-400 flex justify-between">
                  Subtotal
                  <ProductPrice className="flex gap-2 mb-4">
                    AED {totalPrice}
                  </ProductPrice>
                </NormalText>
                <div className="flex flex-col gap-2">
                  <SheetClose
                    className="flex gap-4 items-center"
                    onClick={() => navigate.push('/cart')}
                  >
                    <CustomButtom variant="light" onClick={handleCloseDrawer} className='border-[#EBEBEB] border'>VIEW CART</CustomButtom>
                  </SheetClose>
                  <SheetClose
                    className="flex gap-4 items-center"
                    onClick={() => navigate.push('/checkout')}
                  >
                    <CustomButtom variant="dark" className="hover:text-white border-black border" onClick={handleCloseDrawer}>
                      Check out
                    </CustomButtom>
                  </SheetClose>
                </div>
              </div>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      ) : (
        <div>
          {cartItems.map((item: any) => (
            <div
              className="shadow rounded-md w-full p-2 mt-3 flex flex-wrap md:flex-nowrap justify-between items-center bg-white "
              key={item.id}
            >
              <div className="flex items-center gap-4 w-full">
                <Link href={`/product/${generateSlug(item.name)}`}>
                  <div className='w-24 h-24'>
                    <Image
                      width={isCheckoutPage ? 50 : 100}
                      height={isCheckoutPage ? 50 : 100}
                      src={item.posterImageUrl}
                      alt={item.name}
                      className='rounded-md object-cover w-full h-full'
                    />
                  </div></Link>
                <div className="w-full">
                  <Link href={`/product/${generateSlug(item.name)}`}>
                    <span className="text-16 xl:text-18">{item.name}</span>
                  </Link>
                  <div className="flex flex-wrap md:flex-nowrap lg:hidden justify-between items-center gap-2 md:gap-3 pr-4">
                    {item.discountPrice > 0 ? (
                      <>
                        <p className="text-16 xs:text-18 font-bold text-nowrap">
                          AED <span>{item?.discountPrice * item.quantity}</span>
                        </p>
                        <p className="text-14 font-normal text-nowrap line-through text-[#A5A5A5] w-16">
                          AED <span>{item?.price * item.quantity}</span>
                        </p>
                      </>
                    ) : (
                      <>

                        <p className="text-16 xs:text-18 font-bold text-nowrap">
                          AED <span>{item?.price * item.quantity}</span>
                        </p>
                        <p className="text-[18px] font-bold w-16">

                        </p>
                      </>
                    )}
                    <div className='flex items-center gap-4'>
                      <Link href={`/product/${generateSlug(item.name)}`} >
                        <MdModeEdit
                          className="cursor-pointer"
                          size={20}
                        />
                      </Link>
                      <FaTrash
                        className="cursor-pointer"
                        size={15}
                        onClick={() => removeProductFromCart(item.id)}
                      />
                    </div>
                    {!isCheckoutPage && (
                      <Counter
                        count={item.quantity}
                        stock={item.stock}
                        onIncrement={() =>
                          updateProductQuantity(item.id, item.quantity + 1)
                        }
                        onDecrement={() =>
                          updateProductQuantity(item.id, item.quantity - 1)
                        }
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="hidden lg:flex items-center justify-between gap-2 xl:gap-6 pr-4 w-full">
                <div className="hidden lg:block">
                  {!isCheckoutPage && (
                    <Counter
                      count={item.quantity}
                      stock={item.stock}
                      onIncrement={() =>
                        updateProductQuantity(item.id, item.quantity + 1)
                      }
                      onDecrement={() =>
                        updateProductQuantity(item.id, item.quantity - 1)
                      }
                    />
                  )}
                </div>
                <div className="w-52 xl:w-64 flex gap-2 xl:gap-4 items-center justify-between">
                  {item.discountPrice > 0 ? (
                    <>
                      <p className="text-14 xs:text-16 xl:text-[20px] font-bold text-nowrap">
                        AED <span>{item?.discountPrice * item.quantity}</span>
                      </p>
                      <p className="text-12 xl:text-14 text-nowrap font-normal text-end w-16 line-through text-[#A5A5A5]">
                        AED <span>{item?.price * item.quantity}</span>
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-14 xs:text-16 xl:text-[20px] font-bold text-nowrap">
                        AED <span>{item?.price * item.quantity}</span>
                      </p>
                      <p className='w-16'></p>
                    </>
                  )}
                  <div className='flex items-center gap-2'>
                    <Link href={`/product/${generateSlug(item.name)}`} >
                      <MdModeEdit
                        className="cursor-pointer"
                        size={20}
                      />
                    </Link>
                    <FaTrash
                      className="cursor-pointer"
                      size={15}
                      onClick={() => removeProductFromCart(item.id)}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </React.Fragment>
  );
};

export default CartItems;
