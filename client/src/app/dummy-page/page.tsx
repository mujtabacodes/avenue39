'use client';
import { useSelector, useDispatch } from 'react-redux';
import { State, Dispatch } from '@redux/store'; // Adjust according to your path
import { addItem, removeItem, updateItemQuantity } from '@cartSlice/index'; // Adjust according to your path
import { CartItem } from '@cartSlice/types'; // Adjust according to your path
import { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '@/components/ui/card';
import { setProducts } from '@/redux/slices/main';
const MyComponent = () => {
  const dispatch = useDispatch<Dispatch>();
  const cartItems = useSelector((state: State) => state.cart.items);
  const productsDB = useSelector((state: State) => state.products);
  const products = productsDB.products;

  const exampleProduct: CartItem = {
    id: 3,
    image: {
      src: '/_next/static/media/imageeee.df4aeaf9.png',
      height: 489,
      width: 385,
      blurDataURL:
        '/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fimageeee.df4aeaf9.png&w=6&q=70',
      blurWidth: 6,
      blurHeight: 8,
    },
    name: 'Sparta Coffee Table',
    price: 200,
    discount: 300,
    sale: '50%',
    reviews: 0,
    productType: 'Dinner',
    quantity: 1,
  };

  const addProductToCart = () => {
    dispatch(addItem(exampleProduct));
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
      {products.map((card) => (
        <div key={card?.id}>
          <Card card={card} />
        </div>
      ))}
    </div>
  );
};

export default MyComponent;
