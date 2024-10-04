import Link from 'next/link'
import React from 'react'
import { IoIosHeartEmpty } from 'react-icons/io'

const Wishlist = () => {
  return (
    <div className='lg:w-14 w-12 h-10 rounded-3xl relative flex justify-center items-center border border-black hover:border-main hover:bg-main hover:text-white  cursor-pointer'>
        <Link href={"/wishlist"}><IoIosHeartEmpty size={25} /></Link>
        <div className='w-4 h-4 rounded-full flex justify-center items-center absolute right-2 top-2 bg-black text-white text-10'>
            1
        </div>
    </div>
  )
}

export default Wishlist