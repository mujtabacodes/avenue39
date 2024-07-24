import {  ISliderData, BannerImage,IDiscountProducts  } from '@/types/types';
import { IServiceItem, TSlide } from '@/types/types';
import icon1 from '@icons/1.png';
import icon2 from '@icons/2.png';
import icon3 from '@icons/3.png';
import icon5 from '@icons/5.png';
import banner1 from '@images/banners/banner1.png';
import banner2 from '@images/banners/banner2.png';
import banner3 from '@images/banners/banner3.png';
import banner4 from '@images/banners/megasale.png';
import cardimage1 from '@images/imageeee.png';

import palette from '@icons/palette.png';
import delivery from '@icons/delivery-fast.png';
import privacy from '@icons/privacy.png';
import support from '@icons/chat-46.png';
import opal from '@images/products/OPALdiningtable_900x900S.png'

export const slides: TSlide[] = [
  {
    image: banner1,
    bannerHeading: 'Build Your Home With Furniture',
    bannerSubHeading: 'Making Beautiful Your Home',
    text: 'Slide 1 Text 2',
    buttonText: 'Shop Now',
    buttonLink: '#',
  },
  {
    image: banner2,
    bannerHeading: 'Build Your Home With Furniture',
    bannerSubHeading: 'Making Beautiful Your Home',
    text: 'Slide 2 Text',
    buttonText: 'Shop Now',
    buttonLink: '#',
  },
  {
    image: banner3,
    bannerHeading: 'Build Your Home With Furniture',
    bannerSubHeading: 'Making Beautiful Your Home',
    text: 'Slide 3 Text',
    buttonText: 'Shop Now',
    buttonLink: '#',
  }
];
export const bannerImage: BannerImage = {
  image: banner4,
  altText: "Banner Image",
};
export const serviceItems: IServiceItem[] = [
  {
    id: 1,
    icon: palette,
    title: 'Unique Everything',
  },
  {
    id: 2,
    icon: delivery,
    title: 'Free Shipping & Return',
  },
  {
    id: 3,
    icon: privacy,
    title: 'Secure Payments',
  },
  {
    id: 4,
    icon: support,
    title: 'Support Customer',
  },
];

export const slidersData: ISliderData[] = [
  {
    tabTitle: 'Table',
    cards: [
      { id: 1, image: cardimage1, heading: 'Sparta Coffee Table', price: '$100', discount: '$300' },
      { id: 2, image: cardimage1, heading: 'Sparta Coffee Table', price: '$150' },
      { id: 3, image: cardimage1, heading: 'Sparta Coffee Table', price: '$200' },
      { id: 4, image: cardimage1, heading: 'Sparta Coffee Table', price: '$250' },
      { id: 5, image: cardimage1, heading: 'Sparta Coffee Table', price: '$300' },
    ],
  },
  {
    tabTitle: 'Sofa',
    cards: [
      { id: 1, image: cardimage1, heading: 'Sparta Coffee Table', price: '$350' },
      { id: 2, image: cardimage1, heading: 'Sparta Coffee Table', price: '$400' },
      { id: 3, image: cardimage1, heading: 'Sparta Coffee Table', price: '$450' },
      { id: 4, image: cardimage1, heading: 'Sparta Coffee Table', price: '$500' },
      { id: 5, image: cardimage1, heading: 'Sparta Coffee Table', price: '$550' },
    ],
  },
  {
    tabTitle: 'Lamp',
    cards: [
      { id: 1, image: cardimage1, heading: 'Sparta Coffee Table', price: '$600' },
      { id: 2, image: cardimage1, heading: 'Sparta Coffee Table', price: '$650' },
      { id: 3, image: cardimage1, heading: 'Sparta Coffee Table', price: '$700' },
      { id: 4, image: cardimage1, heading: 'Sparta Coffee Table', price: '$750' },
      { id: 5, image: cardimage1, heading: 'Sparta Coffee Table', price: '$800' },
    ],
  },
  {
    tabTitle: 'Chair',
    cards: [
      { id: 1, image: cardimage1, heading: 'Sparta Coffee Table', price: '$850' },
      { id: 2, image: cardimage1, heading: 'Sparta Coffee Table', price: '$900' },
      { id: 3, image: cardimage1, heading: 'Sparta Coffee Table', price: '$950' },
      { id: 4, image: cardimage1, heading: 'Sparta Coffee Table', price: '$1000' },
      { id: 5, image: cardimage1, heading: 'Sparta Coffee Table', price: '$1050' },
    ],
  },
  {
    tabTitle: 'Monitor',
    cards: [
      { id: 1, image: cardimage1, heading: 'Sparta Coffee Table', price: '$1100' },
      { id: 2, image: cardimage1, heading: 'Sparta Coffee Table', price: '$1150' },
      { id: 3, image: cardimage1, heading: 'Sparta Coffee Table', price: '$1200' },
      { id: 4, image: cardimage1, heading: 'Sparta Coffee Table', price: '$1250' },
      { id: 5, image: cardimage1, heading: 'Sparta Coffee Table', price: '$1300' },
    ],
  },
];
export const discountProducts: IDiscountProducts[] = [
  {
    id: 1,
    imageUrl: opal,
    title: 'Extra 20% off Clearance*'
  },
  {
    id: 2,
    imageUrl: opal,
    title: 'Extra 20% off Clearance*'
  },
  {
    id: 3,
    imageUrl: opal,
    title: 'Extra 20% off Clearance*'
  },
  {
    id: 4,
    imageUrl: opal,
    title: 'Extra 20% off Clearance*'
  },
  {
    id: 5,
    imageUrl: opal,
    title: 'Extra 20% off Clearance*'
  },
  {
    id: 6,
    imageUrl: opal,
    title: 'Extra 20% off Clearance*'
  },
  {
    id: 7,
    imageUrl: opal,
    title: 'Extra 20% off Clearance*'
  },
  {
    id: 8,
    imageUrl: opal,
    title: 'Extra 20% off Clearance*'
  },
  {
    id: 9,
    imageUrl: opal,
    title: 'Extra 20% off Clearance*'
  },
]
