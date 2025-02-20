import { selectTotalPrice, totalProductsInCart } from '@/redux/slices/cart';
import { State } from '@/redux/store';
import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { IReview } from '@/types/types';
import { MdStar, MdStarBorder } from 'react-icons/md';

export const SubTotal = () => {
  const totalPrice = useSelector((state: State) =>
    selectTotalPrice(state.cart),
  );

  return <Fragment>{totalPrice.toLocaleString()}</Fragment>;
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
    5: Array.isArray(reviews)
      ? reviews.filter((review) => review.star === 5).length
      : 0,
    4: Array.isArray(reviews)
      ? reviews.filter((review) => review.star === 4).length
      : 0,
    3: Array.isArray(reviews)
      ? reviews.filter((review) => review.star === 3).length
      : 0,
    2: Array.isArray(reviews)
      ? reviews.filter((review) => review.star === 2).length
      : 0,
    1: Array.isArray(reviews)
      ? reviews.filter((review) => review.star === 1).length
      : 0,
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
/* eslint-disable */
export const generateSlug = (text: string) => {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
};
/* eslint-enable */
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
