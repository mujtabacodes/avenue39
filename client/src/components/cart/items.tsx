'use client';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { State, Dispatch } from '@redux/store'; // Adjust according to your path
import { addItem, removeItem, updateItemQuantity } from '@cartSlice/index'; // Adjust according to your path
import { CartItem } from '@cartSlice/types'; // Adjust according to your path
import { NormalText, ProductName, ProductPrice } from '@/styles/typo';
import { RxCross2 } from 'react-icons/rx';
import Image from 'next/image';
const CartItems = () => {
  const dispatch = useDispatch<Dispatch>();
  const cartItems = useSelector((state: State) => state.cart.items);
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
    <div>
      <ul>
        {cartItems.map((item: any) => (
          <li
            key={item.id}
            className="relative flex items-center bg-slate-50 mt-2 gap-3 w-full"
          >
            <Image
              src={item.image.src}
              alt={item.name}
              width={100}
              height={100}
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
                className="absolute top-0 right-10 cursor-pointer"
                onClick={() => removeProductFromCart(item.id)}
              >
                <RxCross2 />
              </div>
            </div>
            {/* {item.name} -DHR.${item.price * item.quantity} (x{item.quantity})
            {item.discount && (
              <div>
                Discounted Price: {(item.discount * item.quantity).toFixed(2)}
              </div>
            )}
            <button
              onClick={() => updateProductQuantity(item.id, item.quantity + 1)}
              className="bg-green-500"
            >
              Increase Quantity
            </button>
            <button
              onClick={() => updateProductQuantity(item.id, item.quantity - 1)}
            >
              Decrease Quantity
            </button>
            <button
              onClick={() => removeProductFromCart(item.id)}
              className="bg-red-500"
            >
              Remove from Cart
            </button> */}
          </li>
        ))}
      </ul>
      <button onClick={ShowCartItems}>Show product</button>
    </div>
  );
};

export default CartItems;
