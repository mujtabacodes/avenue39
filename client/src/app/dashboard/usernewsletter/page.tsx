'use client';

import ViewNewsletter from '@components/Dashboard/Tables/ViewNewsletter';
import { useEffect, useState } from 'react';
import DefaultLayout from '@components/Dashboard/Layouts/DefaultLayout';
import Breadcrumb from '@components/Dashboard/Breadcrumbs/Breadcrumb';
import ProtectedRoute from '@/hooks/AuthHookAdmin';

const UserNewsletter = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [productloading, setProductloading] = useState<boolean>(false);
  const [selecteMenu, setselecteMenu] = useState<string>('Add All Products');

  useEffect(() => {
    const productHandler = async () => {
      try {
        setProductloading(true);
        const response = await fetch('https://jsonplaceholder.typicode.com/comments');
        const allProducts = await response.json();
        setProducts(allProducts);
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
