'use client';
import { setProducts } from '@/redux/slices/main';
import { State } from '@/redux/store';
import { Dispatch } from '@reduxjs/toolkit';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const Fetch = () => {
  const dispatch = useDispatch<Dispatch>();
  const productsDB = useSelector((state: State) => state.products);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/product/get-all`,
      );
      console.log(response.data);
      dispatch(setProducts(response.data));
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    console.log('hello from fetch');
    fetchProducts();
  }, []);
  return null;
};

export default Fetch;
