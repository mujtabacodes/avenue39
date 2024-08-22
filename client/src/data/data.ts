export const breadcrumbs = [{ label: 'Home', href: '/' }, { label: 'Contact' }];
export const aboutbreadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'About Us' },
];
export const checkout = [
  { label: 'Home', href: '/' },
  { label: 'Cart', href: '/cart' },
  { label: 'checkout' },
];
export const profilebreadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'profile' },
];
export const Orderbreadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Order History' },
];
export const productsbredcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Shop' },
];
export const cartbredcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'checkout' },
];
export const Tersmandcondition = [
  { label: 'Home', href: '/' },
  { label: 'Terms-Condition' },
];
export const PrivacyPolicybredcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Privacy-Policy' },
];
export const TReturnPolicybredcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Return-Policy' },
];
export const TShippingPolicybredcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Shipping-Policy' },
];

import * as Yup from 'yup';
import { Product, Category, FormValues, SubCategory } from '@/types/interfaces';
import { IProduct, IProductAdd, IProductWithoutId } from '@/types/types';

export const validateForm = (formData: {
  fullName: string;
  email: string;
  password: string;
  confirmpassword: string;
}) => {
  if (formData.password !== formData.confirmpassword) {
    return 'Confirm password and password do not match.';
  }

  if (!formData.fullName || !formData.email || !formData.password) {
    return 'All fields are required.';
  }

  if (formData.password.length < 8) {
    return 'Password must be at least 8 characters long.';
  }

  if (!/\d/.test(formData.password)) {
    return 'Password must contain at least one number.';
  }

  if (!/[!@#$%^&*]/.test(formData.password)) {
    return 'Password must contain at least one special character.';
  }

  return '';
};

export const withoutHeaderPages = ['/login', '/register', '/superAdminlogin'];

export const inputFields = [
  { name: 'name', type: 'text' },
  { name: 'description', type: 'text' },
  { name: 'price', type: 'number' },
  // { name: "category", type: 'text' },
  { name: 'discountPrice', type: 'number' },
];

export const CategorinputFields = [{ name: 'name', type: 'text' }];
export const withoutVariation = [
  { name: 'totalStockQuantity', type: 'number' },
];

export const Variation = [
  { name: 'variant', type: 'text' },
  { name: 'quantity', type: 'number' },
];

export const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  price: Yup.string().required('Required'),
  category: Yup.string().required('Required'),
});

export const loginValidationSchema = Yup.object({
  name: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
});

export const categoryValidationSchema = Yup.object({
  name: Yup.string().required('Required'),
  description: Yup.string().required('required'),
});

export const initialValues: Product = {
  name: '',
  description: '',
  price: '',
  colors: [],
  totalStockQuantity: 0,
  variantStockQuantities: [],
  modelDetails: [],
  spacification: [],
  discountPrice: '',
  category: '',
};

export const categoryInitialValues: Category = {
  name: '',
  description: '',
};
export const subcategoryInitialValues: SubCategory = {
  name: '',
  description: '',
  categoriesId: [],
};

export const loginInitialValue = {
  name: '',
  password: '',
};

// @ts-nocheck
export const AddProductvalidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  description: Yup.string().required('Required'),
  price: Yup.number()
    .min(1, 'Minimum sales price must be at least 1')
    .required('Required'),
  discountPrice: Yup.number().nullable(),
  productImages: Yup.array().of(
    Yup.object().shape({
      colorName: Yup.string().nullable(),
    }),
  ),
  // additionalInformation: Yup.array().of(
  //   Yup.object().shape({
  //     name: Yup.string().nullable(),
  //     detail: Yup.string().nullable(),
  //   }),
  // ),
  // categoriesId: Yup.number().required('Category is required'),
});

export const AddproductsinitialValues: IProductAdd = {
  name: '',
  price: 0,
  description: '',
  stock: 0,
  discountPrice: 0,
  posterImageUrl: '',
  posterImagePublicId: '',
  hoverImageUrl: '',
  hoverImagePublicId: '',
  productImages: [],
  spacification: [],
  colors: [],
  additionalInformation: [],
  categories: [],
  subcategories: [],
};

export const options = [
  {
    value: 'abu_dhabi',
    label: 'Abu Dhabi',
  },
  {
    value: 'dubai',
    label: 'Dubai',
  },
  {
    value: 'sharjah',
    label: 'Sharjah',
  },
  {
    value: 'ajman',
    label: 'Ajman',
  },
  {
    value: 'umm_al_quwain',
    label: 'Umm Al Quwain',
  },
  {
    value: 'ras_al_khaimah',
    label: 'Ras Al Khaimah',
  },
  {
    value: 'fujairah',
    label: 'Fujairah',
  },
];
