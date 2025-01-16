'use client';
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { cities } from '@/data';
import { City } from '@/types/types';
import { SubTotal } from '@/config';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const CartOrder: React.FC = () => {
  const [filteredCities, setFilteredCities] = useState<City[]>([]);
  const Navigate = useRouter();
  console.log(filteredCities,"filteredCities")
  const formik = useFormik({
    initialValues: {
      country: '',
      city: '',
      postalCode: '',
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  useEffect(() => {
    if (formik.values.country) {
      setFilteredCities(
        cities.filter((city) => city.country === formik.values.country),
      );
    } else {
      setFilteredCities([]);
    }
  }, [formik.values.country]);

  return (
    <div className="shadow border border-[#EEEEEE] rounded-md p-2 md:p-4 w-full space-y-5 mt-5 md:mt-0">
      <p className="text-center text-[26px]">Cart</p>
      <div className="flex justify-between items-center border-t-2 pt-4">
        <p className="text-[#666666] text-20">Subtotal</p>
        <p className="font-bold text-18">
          AED <span><SubTotal /></span>
        </p>
      </div>
      <div className="flex justify-between items-center pt-4">
        <p className="text-[#666666] font-bold text-20">Total</p>
        <p className="font-medium text-[26px]">
          AED <span><SubTotal /></span>
        </p>
      </div>
      <div className="border-t-2">
        <Link href={"/checkout"}
        
          className="text-18 bg-black hover:bg-white border-2 border-black hover:text-black text-white w-full mt-2 h-[71px] rounded-sm flex justify-center items-center " 
          onClick={() => Navigate.push('/checkout')}
        > 
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
};

export default CartOrder;
