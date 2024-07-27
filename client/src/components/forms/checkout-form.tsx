'use client';
import { useFormik } from 'formik';
import React from 'react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { LabelInput } from '../ui/label-input';
import { Label } from '../ui/label';

  const CheckoutForm = () => {
    const initialValues = {
      firstName: '',
      lastName: '',
      email: '',
      country: '',
      address: '',
      postalCode: '',
      city: '',
      phone: '',
      note: '',
    };
  
    const formik = useFormik({
      initialValues: initialValues,
      onSubmit: (values) => {
        alert(JSON.stringify(values, null, 2));
      },
    });
  
    return (
      <>
        <form onSubmit={formik.handleSubmit} className="space-y-5 mt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <LabelInput
              label="First Name"
              id="firstName"
              name="firstName"
              type="text"
              placeholder="Enter First Name"
              onChange={formik.handleChange}
              value={formik.values.firstName}
            />
            <LabelInput
              label="Last Name"
              id="lastName"
              name="lastName"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.lastName}
            />
          </div>
            <LabelInput
              label="Email Address"
              id="email"
              name="email"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            <div>
                <Label htmlFor="country" className="mb-1 px-8 text-sm font-semibold text-17 text-[#666666]">
                Country
                </Label>
                <Select onValueChange={(value:any) => formik.setFieldValue('country', value)}>
                <SelectTrigger>
                    <SelectValue placeholder="Select a country" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                    <SelectItem value="US">United States</SelectItem>
                    <SelectItem value="CA">Canada</SelectItem>
                    <SelectItem value="GB">United Kingdom</SelectItem>
                    <SelectItem value="AU">Australia</SelectItem>
                    </SelectGroup>
                </SelectContent>
                </Select>
            </div>
              <LabelInput
              label="Street Address *"
              id="address"
              name="address"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.address}
            />
            <LabelInput
              label="Postcode/Zip (Option)"
              id="postalCode"
              name="postalCode"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.postalCode}
            />
            <LabelInput
              label="Town & City"
              id="city"
              name="city"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.city}
            />
            <LabelInput
              label="Phone Number"
              id="phone"
              name="phone"
              type="tel"
              onChange={formik.handleChange}
              value={formik.values.phone}
            />
            <div>
            <Label htmlFor="Notes" className="mb-1 px-8 text-sm font-semibold text-17 text-[#666666]">
            Order Notes
            </Label>
                <textarea
                className="flex-grow h-32 w-full rounded-md bg-[#F6F6F6] mt-2 pl-4 pr-4 outline-none py-2 focus:outline-none focus:ring-0 focus:ring-ring text-15 font-medium"
                id="note"
                name="note"
                onChange={formik.handleChange}
                value={formik.values.note}
            />
            </div>
        </form>
      </>
    );
  };
  
  export default CheckoutForm;