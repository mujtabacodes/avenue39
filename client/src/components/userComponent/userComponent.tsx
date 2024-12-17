'use client';
import React, { Fragment, useState } from 'react';
import Link from 'next/link';
import Loader from '@components/Loader/Loader';
import { usePathname, useRouter } from 'next/navigation';
import { Select } from 'antd';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { USRPROPS } from '@/types/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { FaRegUser } from 'react-icons/fa';
import Services from '../services/services';


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

  const [activeTab, setActiveTab] = useState('Admin');

  const handleTabChange = (value: string) => {
    setActiveTab(value); 
    setadminType && setadminType(value);
  };

  let adminFlag = pathname === '/dashboard/Admin-login';
  return (
    <>
      {/* {SelectComonent ? <SelectComonent /> : null} */}

      <Fragment>
        <div className="grid grid-cols-1 justify-center px-2 py-5">
            <div className="max-w-screen-sm mx-auto px-2 py-5 xs:p-5 sm:p-10 shadow-[0px_3px_6px_#00000029] rounded-md h-fit">
              {/* <div className="flex flex-col items-center  mb-10">
                <h2 className="text-xl text-[#3A393C] lg:text-4xl">
                  {adminFlag ? `Sign in as ${adminType}` : title && title}
                </h2>
                <p className="text-sm text-[#9096B2] mt-3 text-center">
                  {descrition && descrition}
                </p>
              </div> */}

              <Tabs
                value={activeTab}
                onValueChange={handleTabChange}
              >
                <TabsList className=" w-full text-center space-x-4  flex justify-center items-center">
                  <TabsTrigger
                    className=" text-16 md:text-2xl font-bold "
                    value="Admin"
                  >
                    <FaRegUser />
                    Admin
                  </TabsTrigger>
                  <span className="h-10 border border-black" />
                  <TabsTrigger
                    className=" text-16 md:text-2xl font-bold "
                    value="Super-Admin"
                  >
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
                          style={{ backgroundColor: '#F6F6F6 !important' }}
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
                        {loading ? <Loader color="#ffffff" /> : buttonTitle}
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
        <Services />
      </Fragment>
    </>
  );
}
