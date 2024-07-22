import React from 'react'
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

const SocialLink:React.FC = () => {
  return (
    <div className='flex justify-center gap-3 md:gap-4'>
    <FaFacebookF  className='text-[16px] md:text-[20px]' />
    <FaXTwitter className='text-[16px] md:text-[20px]' />
    <FaInstagram className='text-[16px] md:text-[20px]' />
    <FaLinkedinIn className='text-[16px] md:text-[20px]' />
    </div>
  )
}

export default SocialLink