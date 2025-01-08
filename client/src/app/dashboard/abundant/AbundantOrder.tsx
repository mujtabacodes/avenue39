'use client';
import Breadcrumb from '@/components/Dashboard/Breadcrumbs/Breadcrumb';
import DefaultLayout from '@/components/Dashboard/Layouts/DefaultLayout';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { formatDate } from '@/config';
import { LuView } from 'react-icons/lu';
import Cookies from 'js-cookie';
import OrderList from '@/components/Orders/orders';
const AbundantOrder = () => {
  const [abundantOrderData, setAbundantOrderData] = useState<any[]>([]);
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
    setVisible(true);
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName={'Abundant Order'} />
      <OrderList
        orderData={abundantOrderData}
        orderColumns={ordercolumns}
        visible={visible}
        setVisible={setVisible}
        selectedProducts={selectedProducts}
      />
    </DefaultLayout>
  );
};

export default AbundantOrder;
