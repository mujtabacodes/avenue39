'use client';
import Breadcrumb from '@components/Dashboard/Breadcrumbs/Breadcrumb';
import DefaultLayout from '@components/Dashboard/Layouts/DefaultLayout';
import ProtectedRoute from '@/hooks/AuthHookAdmin';
import { useState } from 'react';
import AddSubcategory from '@components/AddCategory/AddSubcategory';
import type { Category , SubCategory } from '@/types/interfaces';
import ViewSubcategries from '@/components/Dashboard/Tables/ViewSubcategries';
import { ICategory } from '@/types/types';

const SubCategoryComponent = ({subCategories , cetagories}: {subCategories: SubCategory[] , cetagories: ICategory[]}) => {
  const [menuType, setMenuType] = useState<string>('Sub Categories');
  const [editCategory, seteditCategory] = useState<
  Category | undefined | null
  >();
console.log(editCategory,'editCategory editCategory')
  return (
    <DefaultLayout>
      <Breadcrumb pageName={menuType} />
      {menuType === 'Sub Categories' ? (
        <div className="flex flex-col gap-10">
          <ViewSubcategries
            setMenuType={setMenuType}
            seteditCategory={seteditCategory}
            editCategory={editCategory}
            subCategories={subCategories}
          />
        </div>
      ) : (
        <AddSubcategory
          setMenuType={setMenuType}
          seteditCategory={seteditCategory}
          editCategory={editCategory}
          categoriesList={cetagories}
        />
      )}
    </DefaultLayout>
  );
};

export default ProtectedRoute(SubCategoryComponent);
