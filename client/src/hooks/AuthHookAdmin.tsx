
'use client'
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Loader from "@components/Loader/Loader";
import { useAppDispatch } from "@components/Others/HelperRedux";
import { loggedInAdminAction } from '@/redux/slices/Admin/AdminsSlice';
import axios from 'axios'
import Cookies from 'js-cookie';
import { useAppSelector } from "@components/Others/HelperRedux";


function ProtectedRoute(WrappedComponent: any) {
  const Wrapper = (props: any) => {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(true);
    const dispatch = useAppDispatch();

    const AddminProfileTriggerHandler = async (token: string | undefined, adminFlag:boolean) => {
      try {
        if(!token) return
            let apiEndpoint = adminFlag ? "getSuperAdminHandler" : "getAdminHandler"
            let user: any = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/${apiEndpoint}`, {
              headers: {
                "Authorization": `Bearer ${token}`
              }
            })
        dispatch(loggedInAdminAction(user.data.user))
               router.push("/dashboard");

      } catch (err: any) {
        console.log(err, "err")
      }finally{
        setLoading(false);
      }
    }

    
    useEffect(() => {
      const token = Cookies.get('2guysAdminToken');
      const superAdmintoken  = Cookies.get('superAdminToken');
      let Finaltoken = superAdmintoken ? superAdmintoken : token 
 
        AddminProfileTriggerHandler( Finaltoken, superAdmintoken ? true : false)

    }, [router]);


    

    if (loading) {
      return (
        <div
          style={{
            background: "#FFF",
            zIndex: 1111,
            alignItems: "center",
            display: "flex",
            height: "100vh",
            width: "-webkit-fill-available",
            justifyContent: "center",
          }}
        >
          <Loader />
        </div>
      );
    } else {


      
    }
   return <WrappedComponent {...props} />;
  };

  return Wrapper;
}

export default ProtectedRoute;
