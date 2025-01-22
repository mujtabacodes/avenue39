'use client';
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { cities } from '@/data';
import { City } from '@/types/types';
import { SubTotal } from '@/config';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { selectTotalPrice } from '@/redux/slices/cart';
import { State } from '@/redux/store';

const CartOrder: React.FC = () => {
  const [filteredCities, setFilteredCities] = useState<City[]>([]);
  const Navigate = useRouter();
    const totalPrice = useSelector((state: State) =>
      selectTotalPrice(state.cart),
    );
  
    
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

  const progressBarPercentage = totalPrice > 1000 ? 100 : (totalPrice / 1000) * 100;
  const remainingAmount = 1000 - totalPrice;
  return (
    <div className="shadow border border-[#EEEEEE] rounded-md p-2 md:p-4 w-full space-y-5 mt-5 md:mt-0">
      <p className="text-center text-[26px]">Cart</p>
      {/* <div className="flex justify-between items-center border-t-2 pt-4">
        <p className="text-[#666666] text-20">Subtotal</p>
        <p className="font-bold text-18">
          AED <span><SubTotal /></span>
        </p>
      </div> */}
      <div className="flex justify-between items-center pt-4">
        <p className="text-[#666666] font-bold text-20">Total</p>
        <p className="font-medium text-[26px]">
          AED <span><SubTotal /></span>
        </p>
      </div>
      <div className="mt-4 space-y-3">
  <p className='text-xs xl:text-14'>Free shipping for any orders above AED. 1,000.00</p>
  {totalPrice >= 1000 ? (
    <div className="relative w-full bg-gray-200 h-6 rounded-full">
      <div
        className="bg-green-500 h-6 rounded-full"
        style={{ width: "100%" }}
      >
        <p className="text-white font-medium absolute inset-0 flex justify-center items-center px-2 text-xs xl:text-14 md:text-sm">
          Congratulations! You've got free shipping!
        </p>
      </div>
    </div>
  ) : (
    <>
      <p className="text-[#666666] text-xs font-medium">Spend AED. {remainingAmount} for free shipping</p>
      <div className="w-full bg-gray-200 h-6 rounded-full ">
      <div className="bg-green-500 h-6 rounded-full" style={{ width: `${progressBarPercentage}%` }}>
      <p className="text-white font-medium text-center  px-2">{Math.round(progressBarPercentage)}%</p></div></div>
    </>
  )}
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
