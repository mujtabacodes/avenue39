'use client';
import dynamic from 'next/dynamic';
import ProtectedRoute from '@/hooks/AuthHookAdmin';

const ECommerce = dynamic(() => import('@/components/Dashboard/E-commerce'), {
  ssr: false,
});

import DefaultLayout from '@/components/Dashboard/Layouts/DefaultLayout';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

function Home() {
  const Navigate = useRouter();

  return (
    <>
      <DefaultLayout>
        <ECommerce />
      </DefaultLayout>
    </>
  );
}

export default ProtectedRoute(Home);
