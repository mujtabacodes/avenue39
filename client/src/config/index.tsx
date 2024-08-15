'use client';
import { selectTotalPrice, totalProductsInCart } from '@/redux/slices/cart';
import { State } from '@/redux/store';
import React, { Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { IReview } from '@/types/types';
import { MdStar, MdStarBorder } from 'react-icons/md';

export const SubTotal = () => {
  const totalPrice = useSelector((state: State) =>
    selectTotalPrice(state.cart),
  );

  return <Fragment>{totalPrice}</Fragment>;
};

export const TotalProducts = () => {
  const totalPrice = useSelector((state: State) =>
    totalProductsInCart(state.cart),
  );
  return <Fragment>{totalPrice}</Fragment>;
};

export const formatDate = (isoDate: string) => {
  const date = new Date(isoDate);
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

export const calculateRatingsPercentage = (reviews: IReview[]) => {
  const totalReviews = reviews.length;

  if (totalReviews === 0) {
    return {
      productReviews: [],
      averageRating: 0,
    };
  }

  const ratingCounts: any = {
    5: reviews.filter((review) => review.star === 5).length,
    4: reviews.filter((review) => review.star === 4).length,
    3: reviews.filter((review) => review.star === 3).length,
    2: reviews.filter((review) => review.star === 2).length,
    1: reviews.filter((review) => review.star === 1).length,
  };

  const totalStars = reviews.reduce((sum, review) => sum + review.star, 0);
  const averageRating = (totalStars / totalReviews).toFixed(1);

  const productReviews = Object.keys(ratingCounts)
    .reverse()
    .map((star) => ({
      label: `${star} star`,
      ratingValue: Math.round((ratingCounts[star] / totalReviews) * 100),
    }));

  return {
    productReviews,
    averageRating: parseFloat(averageRating),
  };
};

export const generateSlug = (text: string) => {
  const formatedSlug = text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');

  return formatedSlug;
};

export const renderStars = ({ star = 0 }: { star?: number }) => {
  const stars = [];
  const maxStars = 5;
  for (let i = 1; i <= maxStars; i++) {
    if (i <= star) {
      stars.push(<MdStar key={i} size={20} className="text-warning" />);
    } else {
      stars.push(<MdStarBorder key={i} size={20} className="text-warning" />);
    }
  }
  return stars;
};
