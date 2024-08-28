'use client';
import React, { Fragment, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Loader from '@components/Loader/Loader';
import { IoArrowBackSharp } from 'react-icons/io5';
import { usePathname, useRouter } from 'next/navigation';
import { Select } from 'antd';
import Container from '../ui/Container';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { USRPROPS } from '@/types/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { FaRegUser } from 'react-icons/fa';
import { CgCloseO } from 'react-icons/cg';
import loginBackground from '@assets/images/login.png';
import logo from '@assets/icons/logo.png';

const { Option } = Select;

export default function UserComponent({
  handleSubmit,
  error,
  loading,
  inputFields,
  title,
  descrition,
  InstructionText,
  routingText,
  buttonTitle,
  navigationLink,
  navigationTxt,
  SelectComonent,
  setadminType,
  adminType,
}: USRPROPS) {
  const router = useRouter();
  const pathname = usePathname();

 
  const [activeTab, setActiveTab] = useState('Admin'); // State for the active tab

  const handleTabChange = (value: string) => {
    setActiveTab(value); // Update the active tab based on the selection
    setadminType && setadminType(value); // Update the admin type when the tab changes
  };

  let adminFlag = pathname === '/dashboard/Admin-login';
  return (
    <>
      {SelectComonent ? <SelectComonent /> : null}

      <Fragment>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-2 pt-10 md:p-10">
            <Link className="flex justify-center md:justify-start" href={'/'}>
              <Image width={250} height={250} src={logo} alt="logo" />
            </Link>
            <div className=" mt-10 md:mt-40 max-w-screen-sm mx-auto">
              {/* <div className="flex flex-col items-center  mb-10">
                <h2 className="text-xl text-[#3A393C] lg:text-4xl">
                  {adminFlag ? `Sign in as ${adminType}` : title && title}
                </h2>
                <p className="text-sm text-[#9096B2] mt-3 text-center">
                  {descrition && descrition}
                </p>
              </div> */}
   
              <Tabs value={activeTab} onValueChange={handleTabChange} className="md:p-2 mb-10">
                <TabsList className=" w-full text-center space-x-4  flex justify-center items-center">
                  <TabsTrigger className=" text-16 md:text-2xl font-bold " value="Admin">
                    <FaRegUser />
                    Admin
                  </TabsTrigger>
                  <span className="h-10 border border-black" />
                  <TabsTrigger className=" text-16 md:text-2xl font-bold " value="Super-Admin">
                    <FaRegUser />
                    Super Admin
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="Admin">
                  <div className="inputs_container w-full mt-10">
                    <form className="space-y-4" onSubmit={handleSubmit}>
                      {inputFields.map((field: any, index: any) => (
                        <Input
                          key={index}
                          type={field.type}
                          name={field.name}
                          id={field.id}
                          placeholder={field.placeholder}
                          value={field.value}
                          onChange={field.onChange}
                          // Icons={field.Icon}
                          // iconClassName={field.iconClassName}
                        />
                      ))}
                      {error ? (
                        <div className="flex justify-center text-red-500">
                          {error}
                        </div>
                      ) : null}
                      <p className="pt-1 ">
                        {!navigationLink ? null : (
                          <Link
                            className="underline text-[#9096B2] pt-4 text-sm"
                            href={navigationLink}
                          >
                            {navigationTxt}
                          </Link>
                        )}
                      </p>

                      <Button
                        className="w-full h-[76px]"
                        variant={'login'}
                        type="submit"
                        disable={loading}
                      >
                        {loading ? <Loader color="#fff" /> : buttonTitle}
                      </Button>
                      <div className="flex justify-end space-y-3 w-full">
                        <p className="text-[#9096B2] text-sm">
                          {InstructionText && InstructionText}{' '}
                          {routingText && (
                            <Link
                              className="underline text-sm text-primary"
                              href={
                                title && title === 'Sign In'
                                  ? '/register'
                                  : '/login'
                              }
                            >
                              {routingText}
                            </Link>
                          )}
                        </p>
                      </div>
                    </form>
                  </div>
                </TabsContent>

                <TabsContent value="Super-Admin">
                  <div className="inputs_container w-full mt-10">
                    <form className="space-y-4" onSubmit={handleSubmit}>
                      {inputFields.map((field: any, index: any) => (
                        <Input
                          key={index}
                          type={field.type}
                          name={field.name}
                          id={field.id}
                          placeholder={field.placeholder}
                          value={field.value}
                          onChange={field.onChange}
                          // Icons={field.Icon}
                          // iconClassName={field.iconClassName}
                        />
                      ))}
                      {error ? (
                        <div className="flex justify-center text-red-500">
                          {error}
                        </div>
                      ) : null}
                      <p className="pt-1 ">
                        {!navigationLink ? null : (
                          <Link
                            className="underline text-[#9096B2] pt-4 text-sm"
                            href={navigationLink}
                          >
                            {navigationTxt}
                          </Link>
                        )}
                      </p>

                      <Button
                        className="w-full h-[76px]"
                        variant={'login'}
                        type="submit"
                        disable={loading}
                      >
                        {loading ? <Loader color="#fff" /> : buttonTitle}
                      </Button>
                      <div className="flex justify-end space-y-3 w-full">
                        <p className="text-[#9096B2] text-sm">
                          {InstructionText && InstructionText}{' '}
                          {routingText && (
                            <Link
                              className="underline text-sm text-primary"
                              href={
                                title && title === 'Sign In'
                                  ? '/register'
                                  : '/login'
                              }
                            >
                              {routingText}
                            </Link>
                          )}
                        </p>
                      </div>
                    </form>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          <div
            className="h-screen hidden md:block"
            style={{
              backgroundImage: `url(${loginBackground.src})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}
          >
            <Container className="mt-10 text-white space-y-5">
              <Link href={'/'} className="flex justify-end">
                <CgCloseO size={50} />
              </Link>
              <div className="text-[40px] font-medium">
                <p>Welcome !</p>
                <p>First time, you should login or sign up</p>
              </div>
            </Container>
          </div>
        </div>
      </Fragment>
    </>
  );
}
