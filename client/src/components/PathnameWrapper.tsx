'use client';

import { usePathname } from 'next/navigation';

import Authhook from '@/hooks/AuthHook';
import Footer from './footer/footer';
import TopNav from './nav/top-nav';
import Navbar from './nav/nav-bar';
import MenuBar from './nav/menu-bar';
import BottomBar from './nav/bottom-bar';
import Header from './nav/Header';

const PathnameWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname() as string;

  const withoutHeaderPages = [
    '/login',
    '/register',
    '/superAdminlogin',
    '/forgot-password',
    '/dashboard',
    '/thanks',
  ];
  return (
    <>
      {withoutHeaderPages.includes(pathname) ||
      pathname.split('/').includes('dashboard') ? null : (
        <>
          <Header />
        </>
      )}
      {children}
      {pathname !== '/' &&
      (withoutHeaderPages.includes(pathname) ||
        pathname.split('/').includes('dashboard')) ? null : (
        <Footer />
      )}
    </>
  );
};

export default Authhook(PathnameWrapper);
