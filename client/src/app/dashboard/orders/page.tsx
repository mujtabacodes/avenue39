'use client';
import React, { useEffect, useState } from 'react';
import Breadcrumb from '@/components/Dashboard/Breadcrumbs/Breadcrumb';
import DefaultLayout from '@/components/Dashboard/Layouts/DefaultLayout';
import axios from 'axios';
import Cookies from 'js-cookie';
import { formatDate } from '@/config';
import OrderList from '@/components/Orders/orders';
import { LuView } from 'react-icons/lu';

interface Order {
  orderId: string;
  user_email?: string;
  address?: string;
  createdAt?: string;
  phoneNumber?: string;
  products?: any[];
  [key: string]: any;
}

const Orders = () => {
  const [orderData, setOrderData] = useState<Order[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);
  const [visible, setVisible] = useState(false);

  const token = Cookies.get('2guysAdminToken');
  const superAdminToken = Cookies.get('superAdminToken');
  const finalToken = token || superAdminToken;

  const headers = { token: finalToken };

  useEffect(() => {
    async function getOrderHistory() {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/sales-record/Get_orders`,
        { headers },
      );
      const data = res.data.filter(
        (order: any) => order.paymentStatus.paymentStatus === true,
      );
      setOrderData(data);
    }

    getOrderHistory();
  }, []);

  const orderColumns = [
    { title: 'OrderId', dataIndex: 'orderId', key: 'orderId' },
    { title: 'Email', dataIndex: 'user_email', key: 'user_email' },
    { title: 'Phone Number', dataIndex: 'phoneNumber', key: 'phoneNumber' },
    { title: 'Address', dataIndex: 'address', key: 'address' },
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
      render: (_: any, record: any) => (
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
      <Breadcrumb pageName="View Orders" />
      <OrderList
        orderData={orderData}
        orderColumns={orderColumns}
        visible={visible}
        setVisible={setVisible}
        selectedProducts={selectedProducts}
      />
    </DefaultLayout>
  );
};

export default Orders;
