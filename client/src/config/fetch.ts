import { ICategory,IReview } from '@/types/types';
import axios from 'axios';

export const fetchProducts = async () => {
  try {
    const result = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/product/get-all`, {
      next: { tags: ['products'] },
    });
    if (!result.ok) {
    console.log(result, "result")

      return []
    }
    const response = await result.json();
    
    return response;
  } catch (error) {
    console.log(error, "error")
  }

};

export const fetchCategories = async (): Promise<ICategory[] | any> => {
  try {
    const result = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/category/get-all`, {
      next: { tags: ['categories'] },
    });
    const response = await result.json();
    return response;
  } catch (error) {
    console.log(error, "error")
  }

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


export const TrimUrlHandler = (name: string | undefined)=>{
if(!name)return ''

return name.trim().toLowerCase()

}
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


