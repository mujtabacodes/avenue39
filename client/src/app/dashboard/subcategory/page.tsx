'use client';

import Breadcrumb from '@components/Dashboard/Breadcrumbs/Breadcrumb';
import TableTwo from '@components/Dashboard/Tables/TableTwo';
import DefaultLayout from '@components/Dashboard/Layouts/DefaultLayout';
import ProtectedRoute from '@/hooks/AuthHookAdmin';
import { useState } from 'react';
import AddSubcategory from '@components/AddCategory/AddSubcategory';
import { CategoriesType } from '@/types/interfaces';
import ViewSubcategries from '@/components/Dashboard/Tables/ViewSubcategries';

const AddCategory = () => {
  const [menuType, setMenuType] = useState<string>('Categories');
  const [editCategory, seteditCategory] = useState<
    CategoriesType | undefined | null
  >();

  return (
    <DefaultLayout>
      <Breadcrumb pageName={menuType} />
      {menuType === 'Categories' ? (
        <div className="flex flex-col gap-10">
          <ViewSubcategries
            setMenuType={setMenuType}
            seteditCategory={seteditCategory}
            editCategory={editCategory}
          />
        </div>
      ) : (
        <AddSubcategory
          setMenuType={setMenuType}
          seteditCategory={seteditCategory}
          editCategory={editCategory}
        />
      )}
    </DefaultLayout>
  );
};

export default ProtectedRoute(AddCategory);
