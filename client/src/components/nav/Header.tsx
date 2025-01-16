import React, { useEffect, useState } from 'react';
import TopNav from './top-nav';
import Navbar from './nav-bar';
import MenuBar from './menu-bar';
import BottomBar from './bottom-bar';

const Header = () => {
  const [menuData, setMenuData] = useState<any[]>([]);

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
      } catch (error: any) {
        console.error(error);
      }
    };

    fetchMenuData();
  }, []);

  console.log(menuData, 'menuDatamenuData');
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
