import Link from 'next/link';
import React from 'react';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { FaPinterestP, FaXTwitter } from 'react-icons/fa6';

interface LinkSocial {
  className?: string;
  linkClass?: string;
  socialSize?: string;
}

const SocialLink: React.FC<LinkSocial> = ({
  className,
  linkClass,
  socialSize,
}) => {
  return (
    <div className={`flex justify-start gap-3 md:gap-4 ${className}`}>
      <Link
        href="https://instagram.com/avenue39home"
        target="_blank"
        className={`${linkClass}`}
      >
        <FaInstagram className={`text-[16px] md:text-[20px] ${socialSize}`} />
      </Link>
      <Link
        href="https://facebook.com/avenue39home"
        target="_blank"
        className={`${linkClass}`}
      >
        <FaFacebookF className={`text-[16px] md:text-[20px] ${socialSize} `} />
      </Link>
      <Link
        href="https://www.pinterest.com/avenue39home"
        target="_blank"
        className={`${linkClass}`}
      >
        <FaPinterestP className={`text-[16px] md:text-[20px] ${socialSize} `} />
      </Link>
      {/* <Link
        href="https://twitter.com/avenue39home"
        target="_blank"
        className={`${linkClass}`}
      >
        <FaXTwitter className={`text-[16px] md:text-[20px] ${socialSize}`} />
      </Link> */}
      {/* <Link href='https://www.linkedin.com/company/avenue39home' target='_blank' className={`${linkClass}`}><FaLinkedinIn className={`text-[16px] md:text-[20px] ${socialSize}`} /></Link> */}
    </div>
  );
};

export default SocialLink;
