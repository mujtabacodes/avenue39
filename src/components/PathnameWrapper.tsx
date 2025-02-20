'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import Authhook from '@/hooks/AuthHook';
import Footer from './footer/footer';
import Header from './nav/Header';

const PathnameWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname() as string;

  const withoutHeaderPages = ['/dashboard', '/thanks'];
  return (
    <>
      {withoutHeaderPages.includes(pathname) ||
      pathname.split('/').includes('dashboard') ? (
        pathname === '/dashboard/Admin-login' ? (
          <Header />
        ) : null
      ) : (
        <>
          <Header />
        </>
      )}
      {children}
      {pathname !== '/' &&
      (withoutHeaderPages.includes(pathname) ||
        pathname.split('/').includes('dashboard')) ? (
        pathname === '/dashboard/Admin-login' ? (
          <Footer />
        ) : null
      ) : (
        <Footer />
      )}
    </>
  );
};

export default Authhook(PathnameWrapper);
