import { H1 } from '@/styles/typo';
import { INav } from '@/types/types';
import React from 'react';

const Navbar = (props: INav) => {
  return (
    <div className="flex">
      <H1>Logo</H1>
    </div>
  );
};

export default Navbar;
