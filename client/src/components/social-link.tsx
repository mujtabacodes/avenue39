import React from 'react';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

interface LinkSocial{
  className?: string; 
  linkClass?: string;  // optional class for link styling
}

const SocialLink: React.FC<LinkSocial> = ({className,linkClass}) => {
  return (
    <div className={`flex justify-start gap-3 md:gap-4 ${className}`}>
      <div className={`${linkClass}`}><FaFacebookF className={`text-[16px] md:text-[20px] `} /></div>
      <div className={`${linkClass}`}><FaXTwitter className={`text-[16px] md:text-[20px] `} /></div>
      <div className={`${linkClass}`}><FaInstagram className={`text-[16px] md:text-[20px] `} /></div>
      <div className={`${linkClass}`}><FaLinkedinIn className={`text-[16px] md:text-[20px] `} /></div>
      
      
      
      
    </div>
  );
};

export default SocialLink;
