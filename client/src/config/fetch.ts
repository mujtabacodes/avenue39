import { ICategory, IProduct, IReview } from '@/types/types';
import axios from 'axios';
import { cookies } from 'next/headers';

export const fetchProducts = async (): Promise<IProduct[]> => {
  const result = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/product/get-all`, {
    next: { tags: ['products'] },
  });
  const response = await result.json();
  return response;
};

export const fetchCategories = async (): Promise<ICategory[]> => {
  const result = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/category/get-all`, {
    next: { tags: ['categories'] },
  });
  const response = await result.json();
  return response;
};
export const fetchSubCategories = async (): Promise<ICategory[]> => {
  const result = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/subcategories/get-all`, {
    next: { tags: ['subcategories'] },
  });
  const response = await result.json();
  return response;
};

export const fetchReviews = async (): Promise<IReview[]> => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/reviews/get-all`,
  );
  return response.data;
};

// export const fetchProducts = async (): Promise<IProduct[]> => {
//   return new Promise<IProduct[]>((resolve, reject) => {
//     setTimeout(async () => {
//       try {
//         const response = await axios.get(
//           `${process.env.NEXT_PUBLIC_BASE_URL}/api/product/get-all`,
//         );
//         resolve(response.data);
//       } catch (error) {
//         reject(error);
//       }
//     }, 10000);
//   });
// };


