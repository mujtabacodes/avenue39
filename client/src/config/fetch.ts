import axios from 'axios';

export const ProductDB = async () => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/product/get-all`,
  );
  return res;
};
