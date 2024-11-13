'use client';

import ViewNewsletter from '@components/Dashboard/Tables/ViewNewsletter';
import { useEffect, useState } from 'react';
import DefaultLayout from '@components/Dashboard/Layouts/DefaultLayout';
import Breadcrumb from '@components/Dashboard/Breadcrumbs/Breadcrumb';
import ProtectedRoute from '@/hooks/AuthHookAdmin';
import axios from 'axios';

const UserNewsletter = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [productloading, setProductloading] = useState<boolean>(false);
  const [selecteMenu, setselecteMenu] = useState<string>('Add All Products');

  useEffect(() => {
    const productHandler = async () => {
      try {
        setProductloading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/newsletters/get-all`,
        );
        setProducts(response.data);
        setProductloading(false);
      } catch (err) {
        console.log('Error Occurred', err);
        setProductloading(false);
      }
    };

    productHandler();
  }, [selecteMenu]);

  let productFlag: boolean = selecteMenu === 'Add All Products';

  return (
    <DefaultLayout>
      <Breadcrumb pageName={productFlag ? 'Newsletter' : 'BroadCast Email'} />
      <ViewNewsletter
        Categories={products} 
        setCategory={setProducts} 
        setselecteMenu={setselecteMenu}
        loading={productloading}
      />
    </DefaultLayout>
  );
};

export default ProtectedRoute(UserNewsletter);
