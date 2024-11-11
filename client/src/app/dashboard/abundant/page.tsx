
'use client'
import Breadcrumb from '@/components/Dashboard/Breadcrumbs/Breadcrumb';
import DefaultLayout from '@/components/Dashboard/Layouts/DefaultLayout';
import React, { useEffect, useState } from 'react';
import FilterTable from '@/components/Dashboard/Tables/FilterTable';
import { ordercolumns, Orderdata } from '@/data/table';
import { Table } from 'antd';


const Abundant  = () => {
  const [abundantOrderData, setAbundantOrderData] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  useEffect(() => {
    setAbundantOrderData(Orderdata);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setAbundantOrderData(
      Orderdata.filter((order) =>
        order.Name ? order.Name.toLowerCase().includes(value.toLowerCase()) : false
      )
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
        <Table
          className="overflow-x-scroll lg:overflow-auto"
          dataSource={abundantOrderData}
          columns={ordercolumns}
          pagination={false}
          rowKey="id"
        />
      ) : (
        'No Orders found'
      )}
    </DefaultLayout>
  );
};

export default Abundant;
