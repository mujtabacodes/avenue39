'use client';

import React, { SetStateAction, useState } from 'react';
import { Table, notification, Modal } from 'antd';
import Image from 'next/image';
import { RiDeleteBin6Line } from 'react-icons/ri';
import axios from 'axios';
import { LiaEdit } from 'react-icons/lia';
import { Category } from '@/types/interfaces';
import { useAppSelector } from '@components/Others/HelperRedux';
import useColorMode from '@/hooks/useColorMode';
import { Skeleton } from '@/components/ui/skeleton';
import { ICategory } from '@/types/types';
import revalidateTag from '@/components/ServerActons/ServerAction';

interface Product {
  id: string;
  name: string;
  category: string;
  posterImageUrl: string;
  createdAt: string;
}

interface CategoryProps {
  setMenuType: React.Dispatch<SetStateAction<string>>;
  seteditCategory?: React.Dispatch<
    SetStateAction<Category | undefined | null>
  >;
  editCategory?: Category | undefined | null;
  cetagories?: ICategory[];
}

const TableTwo = ({
  setMenuType,
  seteditCategory,
  editCategory,
  cetagories
}: CategoryProps) => {
  const [category, setCategory] = useState<ICategory[] | undefined>(cetagories);
  const [loading, setLoading] = useState<boolean>(false);
  const [colorMode, toggleColorMode] = useColorMode();
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  const filteredCategories: ICategory[] =
    category && category
      .filter(
        (category) =>
          category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          category.description && category.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      .sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA;
      }) || [];
  console.log(filteredCategories, 'Filter Cetagories');

  const { loggedInUser }: any = useAppSelector((state) => state.usersSlice);

  const canDeleteCategory = true;
  // const canDeleteCategory =
  //   loggedInUser &&
  //   (loggedInUser.role == 'Admin' ? loggedInUser.canDeleteCategory : true);
  // const canAddCategory = loggedInUser && (loggedInUser.role == 'Admin' ? loggedInUser.canAddCategory : true)
  const canAddCategory = true;

  // const canEditCategory =
  //   loggedInUser &&
  //   (loggedInUser.role == 'Admin' ? loggedInUser.canEditCategory : true);
  const canEditCategory = true;

  const confirmDelete = (key: any) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this category?',
      content: 'Once deleted, the category cannot be recovered.',
      onOk: () => handleDelete(key),
      okText: 'Yes',
      cancelText: 'No',
      okButtonProps: {
        style: {
          backgroundColor: 'black',
          color: 'white',
          outlineColor: 'black',
        },
      },
      cancelButtonProps: {
        style: {
          borderColor: 'black',
          color: 'black',
          outlineColor: 'black',
        },
      },
    });
  };

  const handleDelete = async (key: any) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/category/delete-category`,
        {
          params: {
            categoryId: key,
          },
        },
      );
      setCategory((prev: any) => prev.filter((item: any) => item.id != key));
      revalidateTag('categories')
      notification.success({
        message: 'Category Deleted',
        description: 'The category has been successfully deleted.',
        placement: 'topRight',
      });
    } catch (err) {
      notification.error({
        message: 'Deletion Failed',
        description: 'There was an error deleting the category.',
        placement: 'topRight',
      });
    }
  };

  const handleEdit = (record: any) => {
    if (seteditCategory) {
      seteditCategory(record);
      setMenuType('CategoryForm');
    }
  };

  const columns = [
    {
      title: 'Image',
      dataIndex: 'posterImageUrl',
      key: 'posterImageUrl',
      render: (text: any, record: any) =>
        record.posterImageUrl ? (
          <Image
            src={record.posterImageUrl || ''}
            alt={`Image of ${record.name}`}
            width={50}
            height={50}
          />
        ) : (
          <div>No Image Available </div>
        ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'date',
      render: (text: any, record: any) => {
        const createdAt = new Date(record.createdAt);
        const formattedDate = `${createdAt.getFullYear()}-${String(createdAt.getMonth() + 1).padStart(2, '0')}-${String(
          createdAt.getDate(),
        ).padStart(2, '0')}`;
        return <span>{formattedDate}</span>;
      },
    },
    {
      title: 'Time',
      dataIndex: 'createdAt',
      key: 'time',
      render: (text: any, record: any) => {
        const createdAt = new Date(record.createdAt);
        const formattedTime = `${String(createdAt.getHours()).padStart(2, '0')}:${String(
          createdAt.getMinutes(),
        ).padStart(2, '0')}`;
        return <span>{formattedTime}</span>;
      },
    },
    {
      title: 'Edit',
      key: 'Edit',
      render: (text: any, record: any) => (
        <LiaEdit
          className={`cursor-pointer ${canEditCategory && 'text-black dark:text-white'} ${!canEditCategory && 'cursor-not-allowed text-slate-300'}`}
          size={20}
          onClick={() => handleEdit(record)}
        />
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: any, record: any) => (
        <RiDeleteBin6Line
          className={`cursor-pointer ${canDeleteCategory && 'text-red-500 dark:text-red-700'} ${!canDeleteCategory && 'cursor-not-allowed text-slate-300'
            }`}
          // className="cursor-pointer text-red-500"
          size={20}
          onClick={() => {
            if (canDeleteCategory) {
              confirmDelete(record.id);
            }
          }}
        />
      ),
    },
  ];

  return (
    <div className={colorMode === 'dark' ? 'dark' : ''}>
      {loading ? (
        <div className="space-y-4">
          {Array(5)
            .fill('')
            .map((_, index) => (
              <div key={index} className="flex justify-between items-center">
                <Skeleton className="w-12 h-12 rounded-full" />
                <Skeleton className="w-32 h-6" />
                <Skeleton className="w-32 h-6" />
                <Skeleton className="w-20 h-6" />
                <Skeleton className="w-10 h-6" />
              </div>
            ))}
        </div>
      ) : (
        <>
          <div className="flex justify-between mb-4 items-center text-dark dark:text-white">
            <input
              className="peer lg:p-3 p-2 block outline-none border rounded-md border-gray-200 dark:bg-boxdark dark:bg-transparent dark:border-white text-11 xs:text-sm dark:focus:border-primary focus:border-dark focus:ring-dark-500 disabled:opacity-50 disabled:pointer-events-none dark:text-black"
              type="search"
              placeholder="Search Category"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <div>
              <p
                className={`${canAddCategory && 'cursor-pointer'
                  } lg:p-2 md:p-2 ${canAddCategory &&
                  'bg-black dark:bg-main dark:border-0 text-white rounded-md border   '
                  } flex justify-center ${!canAddCategory && 'cursor-not-allowed '
                  }`}
                onClick={() => {
                  seteditCategory && seteditCategory(null);
                  if (canAddCategory) {
                    setMenuType('Add Category');
                  }
                }}
              >
                Add Category
              </p>
            </div>
          </div>

          {filteredCategories && filteredCategories.length > 0 ? (
            <Table
              className="overflow-x-scroll lg:overflow-auto"
              dataSource={filteredCategories}
              columns={columns}
              pagination={false}
              rowKey="id"
            />
          ) : (
            'No Categories found'
          )}
        </>
      )}
    </div>
  );
};

export default TableTwo;
