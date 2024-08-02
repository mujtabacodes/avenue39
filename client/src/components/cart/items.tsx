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
const CartItems = () => {
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
                  Dhs {item?.discount}
                  <NormalText className="text-slate-400 line-through">
                    {item?.price}
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
  );
};

export default CartItems;
