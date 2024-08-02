'use client';
import { totalProductsInCart } from '@/redux/slices/cart';
import { State } from '@/redux/store';
import React from 'react';
import { useSelector } from 'react-redux';

const TotalProduct = () => {
  const totalPrice = useSelector((state: State) =>
    totalProductsInCart(state.cart),
  );
  return <span>({totalPrice})</span>;
};

export default TotalProduct;
