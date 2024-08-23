import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { RiDeleteBin6Line } from 'react-icons/ri';
import axios from 'axios';
import Loader from '@components/Loader/Loader';
import Cookies from 'js-cookie';
import { FaEdit } from 'react-icons/fa';
import { Button } from '@/components/ui/button';

const superAdmintoken = Cookies.get('superAdminToken');

function Admins({ setselecteMenu, setEditAdmin }: any) {
  const [admins, setAdmins] = useState([]);
  const [loading, setloading] = useState<boolean>(false);
  const [delLoading, setDelLoading] = useState<string | null>(null);
  const [editLoading, setEditLoading] = useState<string | null>(null);
  const superAdmintoken = Cookies.get('superAdminToken');

  useEffect(() => {
    const getAllAdmins = async () => {
      try {
        // setloading(true);
        // const token = Cookies.get('superAdminToken');
        // if (!token) {
        //   return;
        // }

        const headers = {
          token: 'token',
        };

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/get-all`,
          {
            method: 'GET',
            headers: headers,
          },
        );

        const admins = await response.json();
        console.log(admins, 'admins');
        setAdmins(admins);
        setloading(false);
      } catch (err) {
        console.log(err, 'err');
        setloading(false);
      }
    };

    getAllAdmins();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      // const token = localStorage.getItem('superAdminToken');
      // if (!token) {
      //   return;
      // }
      setDelLoading(id);
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/delete-admin`,
        {
          headers: {
            // token: token,
            adminId: id,
          },
        },
      );
      setAdmins((prevAdmins) =>
        prevAdmins.filter((admin: any) => admin.id !== id),
      );
    } catch (error) {
      console.error('Error deleting admin:', error);
    } finally {
      setDelLoading(null); // Reset loading state after delete operation completes
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: any, record: any) => `${record.name}`,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Can Add Product',
      dataIndex: 'canAddProduct',
      key: 'canAddProduct',
      render: (text: any, record: any) => (
        <span>{record.canAddProduct ? 'Yes' : 'No'}</span>
      ),
    },
    {
      title: 'Can Delete Product',
      dataIndex: 'canDeleteProduct',
      key: 'canDeleteProduct',
      render: (text: any, record: any) => (
        <span>{record.canDeleteProduct ? 'Yes' : 'No'}</span>
      ),
    },
    {
      title: 'Can Add Category',
      dataIndex: 'canAddCategory',
      key: 'canAddCategory',
      render: (text: any, record: any) => (
        <span>{record.canAddCategory ? 'Yes' : 'No'}</span>
      ),
    },
    {
      title: 'Can View Product',
      dataIndex: 'canDeleteCategory',
      key: 'canDeleteCategory',
      render: (text: any, record: any) => (
        <span>{record.canDeleteCategory ? 'Yes' : 'No'}</span>
      ),
    },
    {
      title: 'Can view Profit',
      dataIndex: 'canCheckProfit',
      key: 'canCheckProfit',
      render: (text: any, record: any) => (
        <span>{record.canCheckProfit ? 'Yes' : 'No'}</span>
      ),
    },
    {
      title: 'Can View Total user',
      dataIndex: 'canViewUsers',
      key: 'canViewUsers',
      render: (text: any, record: any) => (
        <span>{record.canViewUsers ? 'Yes' : 'No'}</span>
      ),
    },

    {
      title: 'Edit',
      key: 'edit',
      render: (text: any, record: any) =>
        editLoading === record.id ? (
          <Loader />
        ) : (
          <FaEdit
            className="cursor-pointer text-slate-500"
            size={20}
            onClick={() => {
              setEditAdmin(record);
              setselecteMenu('');
            }}
          />
        ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: any, record: any) =>
        delLoading === record.id ? ( // Check if loading state matches current admin ID
          <Loader />
        ) : (
          <RiDeleteBin6Line
            className="cursor-pointer text-red-500"
            size={20}
            onClick={() => handleDelete(record.id)}
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
          <div className="flex justify-between mb-4 items-center text-black dark:text-white ">
            <p>Admins</p>
            <div>
              <Button
                variant={'login'}
                onClick={() => setselecteMenu('Add Admin')}
                className="hover:bg-slate-800"
              >
                Add new Admin
              </Button>
            </div>
          </div>
          {admins && admins.length > 0 ? (
            <Table
              className="overflow-auto dark:border-strokedark dark:bg-boxdark"
              dataSource={admins}
              columns={columns}
              pagination={false}
              rowKey="id"
            />
          ) : (
            <div className="flex justify-center"> No Admin found</div>
          )}
        </>
      )}
    </div>
  );
}

export default Admins;
