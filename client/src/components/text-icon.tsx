import { ITextIcon } from '@/types/types';
import React from 'react';

const TextIcon = ({ Icon, Title }: ITextIcon) => {
  return (
    <div className="flex gap-2">
      {Icon} <span>{Title}</span>
    </div>
  );
};

export default TextIcon;
