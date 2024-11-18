'use client';

import FilterTable from '@/components/Dashboard/Tables/FilterTable';
import TopHero from '@/components/top-hero';
import { Button } from '@/components/ui/button';
import Container from '@/components/ui/Container';
import { Orderbreadcrumbs } from '@/data/data';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaRegUser } from 'react-icons/fa6';
import { MdOutlineProductionQuantityLimits } from 'react-icons/md';
import { Modal, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { State } from '@/redux/store';
import Image from 'next/image';
import Link from 'next/link';
import { generateSlug } from '@/config';

interface Product {
  key: string;
  title: string;
  quantity: number;
  price: number;
  date: string;
  image: string;
}

interface Order {
  key: string;
  OrderId: string;
  Name: string;
  Address: string;
  Country: string;
  Email: string;
  PhoneNumber: string;
  products: Product[];
}

const OrderHistory: React.FC = () => {
  const router = useRouter();
  const { loggedInUser } = useSelector((state: State) => state.usrSlice);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    const token = Cookies.get('user_token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  const showModal = (record: Order) => {
    setSelectedOrder(record);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns: ColumnsType<Order> = [
    {
      title: 'OrderId',
      dataIndex: 'OrderId',
      key: 'OrderId',
      width: '10%',
    },
    {
      title: 'Name',
      dataIndex: 'Name',
      key: 'Name',
      width: '20%',
    },
    {
      title: 'Address',
      dataIndex: 'Address',
      key: 'Address',
      width: '20%',
    },
    {
      title: 'Country',
      dataIndex: 'Country',
      key: 'Country',
      width: '10%',
    },
    {
      title: 'Email',
      dataIndex: 'Email',
      key: 'Email',
      width: '20%',
    },
    {
      title: 'Phone Number',
      dataIndex: 'PhoneNumber',
      key: 'PhoneNumber',
      width: '15%',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
       <div className='flex items-center gap-4'>
        <div
          className="cursor-pointer"
          onClick={() => showModal(record)}
        >
          <MdOutlineProductionQuantityLimits size={30} />
        </div>
         <Link
        href={`/track-order/${generateSlug(record.products[0]?.title || 'order')}`}
         className="cursor-pointer whitespace-nowrap bg-main p-2 rounded-md text-white hover:text-white"
       >
         Track order
       </Link>
       </div>
      ),
    },
  ];

  const orders: Order[] = [
    {
      key: '1',
      OrderId: '001',
      Name: 'John Brown',
      Address: 'New York No. 1 Lake Park',
      Country: 'USA',
      Email: 'john@example.com',
      PhoneNumber: '1234567890',
      products: [
        {
          key: 'p1',
          title: 'Product A',
          quantity: 2,
          price: 50,
          date: '2024-01-10',
          image: 'images/catalogue/sofa.png',
        },
        {
          key: 'p2',
          title: 'Product B',
          quantity: 1,
          price: 20,
          date: '2024-01-10',
          image: 'images/login.jpg',
        },
      ],
    },
    {
      key: '2',
      OrderId: '002',
      Name: 'Joe Black',
      Address: 'London No. 1 Lake Park',
      Country: 'UK',
      Email: 'joe@example.com',
      PhoneNumber: '0987654321',
      products: [
        {
          key: 'p3',
          title: 'Product C',
          quantity: 3,
          price: 75,
          date: '2024-01-15',
          image: 'images/login.jpg',
        },
      ],
    },
    {
      key: '3',
      OrderId: '003',
      Name: 'Jim Green',
      Address: 'Sydney No. 1 Lake Park',
      Country: 'Australia',
      Email: 'jim@example.com',
      PhoneNumber: '1122334455',
      products: [],
    },
  ];

  return (
    <>
      <TopHero breadcrumbs={Orderbreadcrumbs} />
      <Container className="py-10">
        <div className="flex justify-between">
          <div className="space-y-2">
            <h1 className="text-2xl lg:text-3xl font-semibold">Account</h1>
            <Button
              onClick={() => router.push('/login')}
              className="gap-2 text-xl"
              variant={'ghost'}
            >
              <FaRegUser size={20} /> Logout
            </Button>
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl lg:text-3xl font-medium">Account details</h1>
            <div className="space-y-2">
              <button className="underline">View addresses</button>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <h1 className="text-2xl lg:text-3xl font-medium">Order history</h1>
          <Table columns={columns} dataSource={orders} rowKey="key" pagination={false} />
        </div>
      </Container>
      <Modal
        title={<p><strong>Order ID:</strong> {selectedOrder?.OrderId}</p>}
        width={600}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer=""
      >
       {selectedOrder ? (
          <div className="mt-5 space-y-4">
            {selectedOrder.products.length > 0 ? (
              selectedOrder.products.map((product) => (
                <div
                  key={product.key}
                  className="flex gap-3 border rounded-md p-3 hover:border-main transition duration-200"
                >
                  <div>
                    <Image
                      className="rounded-md"
                      width={80}
                      height={80}
                      src={product.image}
                      alt={product.title}
                    />
                  </div>
                  <div>
                    <p className="font-semibold md:text-14">Title: {product.title}</p>
                    <p className="font-semibold md:text-14">
                      Qt: <span>{product.quantity}</span>
                    </p>
                    <p className="font-semibold md:text-14">
                      Price: AED <span>{product.price}</span>
                    </p>
                    <p className="font-semibold md:text-14">
                      Date: <span>{product.date}</span>
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>No products available for this order.</p>
            )}
          </div>
        ) : (
          <p>No details available.</p>
        )}

      </Modal>
    </>
  );
};

export default OrderHistory;
