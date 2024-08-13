import React, { useEffect, useState } from 'react'
import TopNav from './top-nav'
import Navbar from './nav-bar'
import MenuBar from './menu-bar'
import BottomBar from './bottom-bar'

const Header = () => {
    const [loading, setLoading] = useState<boolean>(true); // Add loading state
    const [menuData, setMenuData] = useState<any[]>([]); // State for fetched data
    const [error, setError] = useState<string | null>(null); // State for error handling
  
    useEffect(() => {
      // Fetch menu data from API
      const fetchMenuData = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/category/get-all`,
          );
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          const data = await response.json();
          setMenuData(data); // Set fetched data
          setLoading(false); // Set loading to false when data is ready
        } catch (error:any) {
          setError(error.message); // Set error message
          setLoading(false); // Set loading to false in case of error
        }
      };
  
      fetchMenuData();
    }, []);
  return (
    <>
          <TopNav />
          <Navbar />
          <MenuBar menuData={menuData} loading={loading} error={error} />
          <BottomBar />
    </>
  )
}

export default Header