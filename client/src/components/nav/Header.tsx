import React, { useEffect, useState } from 'react';
import TopNav from './top-nav';
import Navbar from './nav-bar';
import MenuBar from './menu-bar';
import BottomBar from './bottom-bar';

const Header = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [menuData, setMenuData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/category/get-all`,
        );
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setMenuData(data);
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchMenuData();
  }, []);

  console.log(menuData,"menuDatamenuData")
  return (
    <>
      <TopNav />
      <Navbar />
      <MenuBar
      //  menuData={menuData} loading={loading} error={error}
      />
      <BottomBar />
    </>
  );
};

export default Header;
