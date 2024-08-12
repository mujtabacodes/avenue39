'use client';
import React, { SetStateAction, useState } from 'react';
import { MdOutlineCategory } from 'react-icons/md';

interface PROPS {
  isOptionSelected: boolean;
  setSelectedOption: React.Dispatch<SetStateAction<string>>;
  changeTextColor: Function;
  Categories: any[] | undefined;
  selectedOption: string;
  name: string;
  value: string;
  changeHandler: any;
}

const SelectGroupTwo: React.FC<PROPS> = ({
  name,
  value,
  changeHandler,
  isOptionSelected,
  setSelectedOption,
  changeTextColor,
  Categories,
  selectedOption,
}) => {
  return (
    <div>
      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
        Select Category
      </label>

      <div className="relative z-20 bg-white dark:bg-form-input">
        <span className="absolute left-4 top-1/2 z-30 -translate-y-1/2 text-black dark:text-white">
          <MdOutlineCategory size={20} />
        </span>

        <select
          name={name}
          value={value}
          onChange={changeHandler}
<<<<<<< HEAD
          className={`relative z-20 w-full appearance-none rounded border dark:outline-none dark:shadow-none border-stroke darK:border-black px-12 py-3 dark:bg-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input text-black dark:text-white ${
=======
          className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-12 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:border-strokedark dark:bg-boxdark dark:border-strokedark dark:bg-boxdark dark:bg-black dark:text-white dark:bg-boxdark dark:border-white  ${
>>>>>>> 6b02df9a8ddb45509240b5773f8eeacbea312590
            isOptionSelected ? 'text-black dark:text-white' : ''
          }`}
        >
          <option value="" disabled className="text-body dark:text-bodydark">
            Select Category
          </option>

          {Categories &&
            Categories.length > 0 &&
            Categories.map((item, index) => {
              return (
                <option value={item._id} label={item.name} key={index}>
                  {item.name}
                </option>
              );
            })}
        </select>
      </div>
    </div>
  );
};

export default SelectGroupTwo;
