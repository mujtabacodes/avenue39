'use client';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { State, Dispatch } from '@redux/store'; // Adjust according to your path
import {
  addItem,
  removeItem,
  selectTotalPrice,
  updateItemQuantity,
} from '@cartSlice/index'; // Adjust according to your path
import { CartItem } from '@cartSlice/types'; // Adjust according to your path
import { NormalText, ProductName, ProductPrice } from '@/styles/typo';
import { RxCross2 } from 'react-icons/rx';
import Image from 'next/image';
import { Button } from '../ui/button';
import CustomButtom from '../ui/custom-button';
import Counter from '../counter';
import { IoCloseSharp } from 'react-icons/io5';

interface ICartItems {
  isCartPage?: boolean;
  isCheckoutPage?: boolean;
}
const CartItems = ({ isCartPage, isCheckoutPage }: ICartItems) => {
  const dispatch = useDispatch<Dispatch>();
  const cartItems = useSelector((state: State) => state.cart.items);
  const totalPrice = useSelector((state: State) =>
    selectTotalPrice(state.cart),
  );

  //   const addProductToCart = () => {
  //     dispatch(addItem(exampleProduct));
  //   };
  const ShowCartItems = () => {
    console.log(cartItems);
  };
  const removeProductFromCart = (id: number) => {
    dispatch(removeItem(id));
  };

  const updateProductQuantity = (id: number, quantity: number) => {
    if (quantity > 0) {
      // Prevent setting quantity to 0 or negative
      dispatch(updateItemQuantity({ id, quantity }));
    }
  };
  return (
    <React.Fragment>
      {!isCartPage ? (
        <div className="mr-6">
          <ul>
            {cartItems.map((item: any) => (
              <li
                key={item.id}
                className="relative flex items-center bg-slate-50 mt-2 border-dotted gap-3 w-full"
              >
                <Image
                  src={item.image.src}
                  alt={item.name}
                  width={80}
                  height={80}
                />

                <div>
                  <ProductName>{item.name}</ProductName>
                  <div className="flex justify-between">
                    <span> Qty {item.quantity}</span>
                    <ProductPrice className="flex gap-2 mb-4">
                      Dhs {item?.discount * item.quantity}
                      <NormalText className="text-slate-400 line-through">
                        {item?.price * item.quantity}
                      </NormalText>
                    </ProductPrice>
                  </div>
                  <div
                    className="absolute top-0 right-0 cursor-pointer"
                    onClick={() => removeProductFromCart(item.id)}
                  >
                    <RxCross2 />
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className=" mt-6 pt-5 border-t-2 flex flex-col gap-2">
            <NormalText className="text-slate-400 flex justify-between">
              Subtotal
              <ProductPrice className="flex gap-2 mb-4">
                Dhs {totalPrice}
              </ProductPrice>
            </NormalText>
            <CustomButtom variant="light">VIEW CART</CustomButtom>
            <CustomButtom variant="dark">Check out</CustomButtom>
          </div>
        </div>
      ) : (
        <div>
          {cartItems.map((item: any) => (
            <div
              className="shadow rounded-md w-full p-2 bg-white mt-3 flex flex-wrap md:flex-nowrap justify-between items-center"
              key={item.id}
            >
              <div className="flex items-center gap-4">
                <Image
                  width={100}
                  height={100}
                  src={item.image.src}
                  alt={item.name}
                />
                <div className="">
                  <p className="text-16 xl:text-18">{item.name}</p>
                  <div className="flex flex-wrap md:flex-nowrap lg:hidden justify-between items-center gap-2 md:gap-6 pr-4">
                    <p className="text-[18px] font-bold">
                      Dhs.<span>{item?.discount * item.quantity}</span>
                    </p>
                    <p className="text-14 font-normal line-through text-[#A5A5A5]">
                      Dhs.<span> {item?.price * item.quantity}</span>
                    </p>
                    <IoCloseSharp className="cursor-pointer" size={20} />

                    <div>
                      {!isCheckoutPage && (
                        <Counter
                          count={item.quantity}
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
              </div>

              <div className="hidden lg:block">
                {!isCheckoutPage && (
                  <Counter
                    count={item.quantity}
                    onIncrement={() =>
                      updateProductQuantity(item.id, item.quantity + 1)
                    }
                    onDecrement={() =>
                      updateProductQuantity(item.id, item.quantity - 1)
                    }
                  />
                )}
              </div>
              <div className="hidden lg:flex items-center gap-6 pr-4">
                <p className="text-16 xl:text-[22px] font-bold">
                  Dhs.<span>{item?.discount * item.quantity}</span>
                </p>
                <p className="text-12 xl:text-16 font-normal line-through text-[#A5A5A5]">
                  Dhs.<span>{item?.price * item.quantity}</span>
                </p>
                <IoCloseSharp
                  className="cursor-pointer"
                  size={25}
                  onClick={() => removeProductFromCart(item.id)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </React.Fragment>
  );
};

export default CartItems;
