'use client'
import Breadcrumb from '@/components/Dashboard/Breadcrumbs/Breadcrumb';
import DefaultLayout from '@/components/Dashboard/Layouts/DefaultLayout';
import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { ordercolumns, Orderdata } from '@/data/table';


interface Order {
  OrderId: string;  
  Name?: string;
  Address?: string;
  Country?: string;
  Email?: string;
  PhoneNumber?: string;
  [key: string]: any;  
}

const Orders = () => {
  const [orderData, setOrderData] = useState<Order[]>([]);  
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    setOrderData(Orderdata);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    setOrderData(
      Orderdata.filter((order) => {
        const lowercasedSearchTerm = value.toLowerCase();
        return (
          (order.Name && order.Name.toLowerCase().includes(lowercasedSearchTerm)) ||
          (order.Address && order.Address.toLowerCase().includes(lowercasedSearchTerm)) ||
          (order.Country && order.Country.toLowerCase().includes(lowercasedSearchTerm)) ||
          (order.Email && order.Email.toLowerCase().includes(lowercasedSearchTerm)) ||
          (order.PhoneNumber && order.PhoneNumber.includes(value)) ||
          (order.OrderId && order.OrderId.includes(value))
        );
      })
    );
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName={'View Orders'} />
      <div className="flex justify-between mb-4 items-center text-dark dark:text-white">
        <input
          className="peer lg:p-3 p-2 block outline-none border rounded-md border-gray-200 dark:bg-boxdark dark:bg-transparent dark:border-white text-11 xs:text-sm dark:focus:border-primary focus:border-dark focus:ring-dark-500 disabled:opacity-50 disabled:pointer-events-none dark:text-black"
          type="search"
          placeholder="Search Abundant Order"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {orderData.length > 0 ? (
        <Table
          className="overflow-x-scroll lg:overflow-auto"
          dataSource={orderData}
          columns={ordercolumns}
          pagination={false}
          rowKey="OrderId" 
        />
      ) : (
        'No Orders found'
      )}
    </DefaultLayout>
  );
};

export default Orders;
