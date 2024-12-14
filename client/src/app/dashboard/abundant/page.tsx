'use client';
import Breadcrumb from '@/components/Dashboard/Breadcrumbs/Breadcrumb';
import DefaultLayout from '@/components/Dashboard/Layouts/DefaultLayout';
import React, { useEffect, useState } from 'react';
import FilterTable from '@/components/Dashboard/Tables/FilterTable';
import { ordercolumns, Orderdata } from '@/data/table';
import { Modal, Table } from 'antd';
import axios from 'axios';
import { formatDate } from '@/config';
import { LuView } from 'react-icons/lu';
import Image from 'next/image';
import Cookies from 'js-cookie';
const Abundant = () => {
  const [abundantOrderData, setAbundantOrderData] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [visible, setVisible] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);
  const token = Cookies.get('2guysAdminToken');
  const superAdminToken = Cookies.get('superAdminToken');
  let finalToken = token ? token : superAdminToken;
  const headers = {
    token: finalToken,
  };
  useEffect(() => {
    async function getOrderHistory() {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/sales-record/Get_orders`,
        {
          headers,
        },
      );
      console.log(res.data);
      const data = res.data.filter(
        (order: any) => order.paymentStatus.paymentStatus === false,
      );
      console.log('----------- AYLO ---------');
      console.log(data);
      setAbundantOrderData(data);
    }
    getOrderHistory();
  }, []);

  const ordercolumns = [
    {
      title: 'OrderId',
      dataIndex: 'orderId',
      key: 'orderId',
    },
    {
      title: 'Email',
      dataIndex: 'user_email',
      key: 'user_email',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',

      render: (createdAt: string) => formatDate(createdAt),
    },
    {
      title: 'View Products',
      dataIndex: 'view',
      key: 'view',
      render: (text: any, record: any) => (
        <span className="flex justify-center">
          <LuView
            onClick={() => handleViewProducts(record.products)}
            className="cursor-pointer text-green-500"
            size={30}
          />
        </span>
      ),
    },
  ];

  const handleViewProducts = (products: any[]) => {
    setSelectedProducts(products);
    console.log('================= CHAL OYE ================');
    console.log(products);
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setAbundantOrderData(
      Orderdata.filter((order) =>
        order.Name
          ? order.Name.toLowerCase().includes(value.toLowerCase())
          : false,
      ),
    );
  };
  return (
    <DefaultLayout>
      <Breadcrumb pageName={'Abundant Order'} />
      {/* <FilterTable data={Orderdata} columns={ordercolumns} /> */}
      <div className="flex justify-between mb-4 items-center text-dark dark:text-white">
        <input
          className="peer lg:p-3 p-2 block outline-none border rounded-md border-gray-200 dark:bg-boxdark dark:bg-transparent dark:border-white text-11 xs:text-sm dark:focus:border-primary focus:border-dark focus:ring-dark-500 disabled:opacity-50 disabled:pointer-events-none dark:text-black"
          type="search"
          placeholder="Search Order"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      {abundantOrderData ? (
        <>
          <Table
            className="overflow-x-scroll lg:overflow-auto"
            dataSource={abundantOrderData}
            columns={ordercolumns}
            pagination={false}
            rowKey="id"
          />
          <Modal
            title="Order Detail"
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
          >
            {selectedProducts.map((product) => (
              <div className="flex gap-2 items-center mt-2" key={product.id}>
                <Image
                  className="rounded-md"
                  width={100}
                  height={100}
                  src={product.productData.posterImageUrl}
                  alt={product.productData.name}
                />
                <div>
                  <h3>{product.productData.name}</h3>
                  <p>
                    Price: {product.productData.price}{' '}
                    {product.productData.currency}
                  </p>
                  <p>Quantity: {product.quantity}</p>
                </div>
              </div>
            ))}
          </Modal>
        </>
      ) : (
        'No Orders found'
      )}
    </DefaultLayout>
  );
};

export default Abundant;
