
"use client"
import React, { Fragment, useState } from 'react';
import loginBackground from '@assets/images/login.png';
import Container from '@/components/ui/Container';
import { CgCloseO } from "react-icons/cg";
import Link from 'next/link';
import logo from '@assets/icons/logo.png';
import Image from 'next/image';
import { LoginForm } from '@/components/register/login-form';
import Services from '@/components/services/services';
const Login = () => {
  const [activeTab, setActiveTab] = useState('login');

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  return (
    <Fragment>
      <div className="grid grid-cols-1 justify-center px-2 py-5">
        <div className={`${activeTab === 'login' ? 'max-w-screen-sm' : 'max-w-screen-md'} w-full mx-auto px-2 py-5 xs:p-5 sm:p-10 shadow-[0px_3px_6px_#00000029] rounded-md h-fit`}>
          <LoginForm  onTabChange={handleTabChange} />
        </div>
      </div>
      <Services />
    </Fragment>
  );
};

export default Login;
