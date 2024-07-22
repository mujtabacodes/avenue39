import React from 'react';
import TextIcon from '../text-icon';
import { MdEmail } from 'react-icons/md';
import { Phone } from 'lucide-react';

const TopNav = () => {
  return (
    <div className="bg-black text-secondary">
      <TextIcon Title="admin@gmail.com" Icon=<MdEmail /> />
      <TextIcon Title="+923000000" Icon=<Phone /> />
      TopNav
    </div>
  );
};

export default TopNav;
