'use client';

import React, { useState } from 'react';
import { Table, notification, Modal } from 'antd';
import { RiDeleteBin6Line } from 'react-icons/ri';
import axios from 'axios';
import Loader from '@components/Loader/Loader';

interface Product {
  id: string;
  email: string;
}

interface CategoryProps {
  Categories: Product[];
  setCategory: React.Dispatch<React.SetStateAction<Product[]>>;
  setselecteMenu: (menu: string) => void;
  loading: boolean;
}

const ViewNewsletter: React.FC<CategoryProps> = ({
  Categories,
  setCategory,
  setselecteMenu,
  loading,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>(''); 
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts: Product[] =
    Categories?.filter((product) =>
      product.email && product.email.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const handleDelete = async (key: string) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/api/product/delete-product`, {
        headers: { productId: key },
      });
      setCategory((prev) => prev.filter((item) => item.id !== key));
      notification.success({
        message: 'Email Deleted',
        description: 'The Email has been successfully deleted.',
        placement: 'topRight',
      });
    } catch (err) {
      notification.error({
        message: 'Deletion Failed',
        description: 'There was an error deleting the Email.',
        placement: 'topRight',
      });
    }
  };

  const confirmDelete = (key: string) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this Email?',
      content: 'Once deleted, the Email cannot be recovered.',
      onOk: () => handleDelete(key),
      okText: 'Yes',
      cancelText: 'No',
    });
  };

  const columns = [
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: any, record: Product) => (
        <RiDeleteBin6Line
          className="text-red-600 cursor-pointer"
          size={20}
          onClick={() => confirmDelete(record.id)}
        />
      ),
    },
  ];

  return (
    <div>
      {loading ? (
        <div className="flex justify-center mt-10">
          <Loader />
        </div>
      ) : (
        <>
          <div className="flex justify-between gap-2 mb-4 items-center">
            <input
              type="search"
              placeholder="Search Email"
              value={searchTerm}
              onChange={handleSearchChange}
              className="p-2 border rounded-md"
            />
            <button
              onClick={() => setselecteMenu('Broadcast Email')}
              className="bg-primary text-white px-4 py-2 rounded-md"
            >
              Broadcast Email
            </button>
          </div>
          <Table
            rowKey="id"
            rowSelection={{
              selectedRowKeys,
              onChange: onSelectChange,
            }}
            dataSource={filteredProducts}
            columns={columns}
            pagination={false}
          />
        </>
      )}
    </div>
  );
};

export default ViewNewsletter;
