'use client';
import React, { SetStateAction, useState } from 'react';
import Imageupload from '@components/ImageUpload/Imageupload';
import { RxCross2 } from 'react-icons/rx';
import Image from 'next/image';
import { ImageRemoveHandler } from '@/utils/helperFunctions';
import Toaster from '@components/Toaster/Toaster';
import axios from 'axios';
import { Formik, Form } from 'formik';
import { Category, SubCategory } from '@/types/interfaces';
import { IoMdArrowRoundBack } from 'react-icons/io';
import {
  categoryInitialValues,
  categoryValidationSchema,
  subcategoryInitialValues,
} from '@/data/data';
import ProtectedRoute from '@/hooks/AuthHookAdmin';
import Loader from '@components/Loader/Loader';
import { ICategory } from '@/types/types';
import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from '@/config/fetch';
import { Checkbox } from '../ui/checkbox';
import showToast from '@components/Toaster/Toaster';

interface editCategoryNameType {
  name: string;
  description: string;
  categoriesId: number[]; // Ensure this is a number array
}

interface editCategoryProps {
  seteditCategory: any;
  editCategory: any;
  setMenuType: React.Dispatch<SetStateAction<string>>;
}

const FormLayout = ({
  seteditCategory,
  editCategory,
  setMenuType,
}: editCategoryProps) => {
  let CategoryName =
    editCategory && editCategory.name
      ? {
          name: editCategory.name,
          description: editCategory.description,
          categoriesId: editCategory.categoriesId || [],
        }
      : null;
  let CategorImageUrl = editCategory && editCategory.posterImageUrl;
  const [posterimageUrl, setposterimageUrl] = useState<
    any[] | null | undefined
  >(CategorImageUrl ? [CategorImageUrl] : null);
  const [loading, setloading] = useState<boolean>(false);
  const [editCategoryName, setEditCategoryName] = useState<
    editCategoryNameType | null | undefined
  >(CategoryName);

  const onSubmit = async (values: SubCategory, { resetForm }: any) => {
    console.log('dubuge 1');
    if (values.categoriesId.length === 0) {
      return showToast('warn', 'Select parent category!!');
    }
    try {
      setloading(true);
      let posterImageUrl = posterimageUrl && posterimageUrl[0];
      if (!posterImageUrl) {
        setloading(false);
        return showToast('warn', 'Select parent category!!');
      }
      let newValue = { ...values, posterImageUrl };
      console.log(newValue);
      console.log('dubuge 2');
      let updateFlag = editCategoryName ? true : false;
      let addProductUrl = updateFlag
        ? `/api/subcategories/update-subcategory`
        : null;
      let url = `${process.env.NEXT_PUBLIC_BASE_URL}${
        updateFlag ? addProductUrl : '/api/subcategories/add-subcategory'
      }`;

      console.log('dubuge 3');
      const response = await axios.post(
        url,
        updateFlag ? { ...newValue, id: editCategory.id } : newValue,
      );
      console.log(response, 'response');
      setloading(false);
      showToast(
        'success',
        updateFlag
          ? 'Sub Category has been sucessufully updated!'
          : 'Sub Category has been sucessufully Created!',
      );
      updateFlag ? seteditCategory(null) : null;
      setposterimageUrl(null);

      resetForm();
    } catch (err) {
      console.log('error occurred', err);
      setloading(false);
    }
  };

  const {
    data: categoriesList = [],
    error,
    isLoading,
  } = useQuery<ICategory[], Error>({
    queryKey: ['products'],
    queryFn: fetchCategories,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  console.log('Categories List here...');
  console.log(categoriesList);

  return (
    <>
      <p
        className="text-lg font-black mb-4 flex items-center justify-center gap-2 hover:bg-gray-200 w-fit p-2 cursor-pointer text-black dark:bg-boxdark dark:bg-black dark:text-white dark:bg-boxdark dark:border-white"
        onClick={() => {
          setMenuType('Sub Categories');
        }}
      >
        <IoMdArrowRoundBack /> Back
      </p>
      <Formik
        initialValues={
          editCategoryName ? editCategoryName : subcategoryInitialValues
        }
        validationSchema={categoryValidationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
          return (
            <Form onSubmit={formik.handleSubmit}>
              <div className="flex justify-center dark:bg-boxdark dark:bg-black dark:text-white dark:bg-boxdark dark:border-white">
                <div className="flex flex-col gap-5 md:gap-9 w-full lg:w-4/5 xl:w-2/5 dark:bg-boxdark dark:bg-black dark:text-white dark:bg-boxdark dark:border-white">
                  <div className="rounded-sm border border-stroke bg-white  dark:bg-boxdark dark:bg-black dark:text-white dark:bg-boxdark dark:border-white p-3">
                    <div className="rounded-sm border border-stroke bg-white  dark:border-strokedark dark:bg-boxdark">
                      <div className="border-b border-stroke py-4 px-2 dark:bg-boxdark dark:bg-black dark:text-white dark:bg-boxdark dark:border-white">
                        <h3 className="font-medium text-black dark:text-white">
                          Add Sub Category Images
                        </h3>
                      </div>
                      {posterimageUrl && posterimageUrl.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 dark:bg-boxdark dark:bg-black dark:text-white dark:bg-boxdark dark:border-white">
                          {posterimageUrl.map((item: any, index) => {
                            return (
                              <div
                                className="relative group rounded-lg overflow-hidden shadow-md bg-white transform transition-transform duration-300 hover:scale-105"
                                key={index}
                              >
                                <div className="absolute top-1 right-1 invisible group-hover:visible text-red bg-white rounded-full ">
                                  <RxCross2
                                    className="cursor-pointer text-red-500 dark:text-red-700"
                                    size={17}
                                    onClick={() => {
                                      ImageRemoveHandler(
                                        item.public_id,
                                        setposterimageUrl,
                                      );
                                    }}
                                  />
                                </div>
                                <Image
                                  key={index}
                                  className="object-cover w-full h-full dark:bg-black dark:shadow-lg"
                                  width={300}
                                  height={200}
                                  src={item.imageUrl}
                                  alt={`productImage-${index}`}
                                />
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <Imageupload setposterimageUrl={setposterimageUrl} />
                      )}
                    </div>

                    <div className="flex flex-col gap-5.5 p-6.5">
                      <div>
                        <label className="mb-3 block py-4 px-2 text-sm font-medium text-black dark:text-white">
                          Sub Category Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          onChange={formik.handleChange}
                          value={formik.values.name}
                          placeholder="Title"
                          className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                            formik.touched.name && formik.errors.name
                              ? 'border-red-500'
                              : ''
                          }`}
                        />
                        {formik.touched.name && formik.errors.name ? (
                          <div className="text-red-500 text-sm">
                            {formik.errors.name}
                          </div>
                        ) : null}
                      </div>

                      <div>
                        <label className="mb-3 block py-4 px-2 text-sm font-medium text-black dark:text-white">
                          Category Description
                        </label>
                        <textarea
                          name="description"
                          onChange={formik.handleChange}
                          value={formik.values.description}
                          placeholder="Description"
                          className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                            formik.touched.name && formik.errors.name
                              ? 'border-red-500'
                              : ''
                          }`}
                        />
                        {formik.touched.name && formik.errors.name ? (
                          <div className="text-red-500 text-sm">
                            {formik.errors.name}
                          </div>
                        ) : null}
                      </div>

                      <div>
                        <label className="mb-3 block py-4 px-2 text-sm font-medium text-black dark:text-white">
                          Select Parent Category (atleat one)
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {categoriesList.map((category) => (
                            <div
                              key={category.id}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox
                                checked={formik.values.categoriesId.includes(
                                  category.id,
                                )}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    formik.setFieldValue('categoriesId', [
                                      ...formik.values.categoriesId,
                                      category.id,
                                    ]);
                                  } else {
                                    formik.setFieldValue(
                                      'categoriesId',
                                      formik.values.categoriesId.filter(
                                        (id) => id !== category.id,
                                      ),
                                    );
                                  }
                                }}
                                // id={`category-${category.id}`}
                              />
                              <label
                                htmlFor={`category-${category.id}`}
                                className="ml-2 text-black dark:text-white"
                              >
                                {category.name}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="mt-4 px-8 py-2 bg-primary dark:bg-main dark:border-0 text-white rounded"
                >
                  {loading ? <Loader /> : 'Submit'}
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default ProtectedRoute(FormLayout);
