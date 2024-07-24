import {  IChairProducts, ISliderData, BannerImage, IDiscountProducts , IServiceItem, TSlide  } from '@/types/types';

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
import armChair from '@images/products/armchair.png'

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
      { id: 1, image: cardimage1, heading: 'Sparta Coffee Table', price: '$100' , discount: '$300' , sale: '50%' , reviews: 3},
      { id: 2, image: cardimage1, heading: 'Sparta Coffee Table', price: '$150' , discount: '$300' , sale: '30%' , reviews: 5},
      { id: 3, image: cardimage1, heading: 'Sparta Coffee Table', price: '$200' , discount: '$300' , sale: '50%' , reviews: 4},
      { id: 4, image: cardimage1, heading: 'Sparta Coffee Table', price: '$250' , discount: '$300' , sale: '45%' , reviews: 2},
      { id: 5, image: cardimage1, heading: 'Sparta Coffee Table', price: '$300' , discount: '$300' , sale: '70%' , reviews: 4},
    ],
  },
  {
    tabTitle: 'Sofa',
    cards: [
      { id: 1, image: cardimage1, heading: 'Sparta Coffee Table', price: '$350' , discount: '$300' , sale: '50%', reviews: 3},
      { id: 2, image: cardimage1, heading: 'Sparta Coffee Table', price: '$400' , discount: '$300' , sale: '30%', reviews: 5},
      { id: 3, image: cardimage1, heading: 'Sparta Coffee Table', price: '$450' , discount: '$300' , sale: '50%', reviews: 4},
      { id: 4, image: cardimage1, heading: 'Sparta Coffee Table', price: '$500' , discount: '$300' , sale: '45%', reviews: 5},
      { id: 5, image: cardimage1, heading: 'Sparta Coffee Table', price: '$550' , discount: '$300' , sale: '70%', reviews: 3},
    ],
  },
  {
    tabTitle: 'Lamp',
    cards: [
      { id: 1, image: cardimage1, heading: 'Sparta Coffee Table', price: '$600' , discount: '$300' , sale: '50%', reviews: 3},
      { id: 2, image: cardimage1, heading: 'Sparta Coffee Table', price: '$650' , discount: '$300' , sale: '30%', reviews: 5},
      { id: 3, image: cardimage1, heading: 'Sparta Coffee Table', price: '$700' , discount: '$300' , sale: '50%', reviews: 4},
      { id: 4, image: cardimage1, heading: 'Sparta Coffee Table', price: '$750' , discount: '$300' , sale: '45%', reviews: 2},
      { id: 5, image: cardimage1, heading: 'Sparta Coffee Table', price: '$800' , discount: '$300' , sale: '70%', reviews: 3},
    ],
  },
  {
    tabTitle: 'Chair',
    cards: [
      { id: 1, image: cardimage1, heading: 'Sparta Coffee Table', price: '$850'  , discount: '$300' , sale: '50%', reviews: 3},
      { id: 2, image: cardimage1, heading: 'Sparta Coffee Table', price: '$900'  , discount: '$300' , sale: '30%', reviews: 5},
      { id: 3, image: cardimage1, heading: 'Sparta Coffee Table', price: '$950'  , discount: '$300' , sale: '50%', reviews: 4},
      { id: 4, image: cardimage1, heading: 'Sparta Coffee Table', price: '$1000' , discount: '$300' , sale: '45%', reviews: 2},
      { id: 5, image: cardimage1, heading: 'Sparta Coffee Table', price: '$1050' , discount: '$300' , sale: '70%', reviews: 3},
    ],
  },
  {
    tabTitle: 'Monitor',
    cards: [
      { id: 1, image: cardimage1, heading: 'Sparta Coffee Table', price: '$1100'  , discount: '$300' , sale: '50%', reviews: 3},
      { id: 2, image: cardimage1, heading: 'Sparta Coffee Table', price: '$1150'  , discount: '$300' , sale: '30%', reviews: 5},
      { id: 3, image: cardimage1, heading: 'Sparta Coffee Table', price: '$1200'  , discount: '$300' , sale: '50%', reviews: 4},
      { id: 4, image: cardimage1, heading: 'Sparta Coffee Table', price: '$1250'  , discount: '$300' , sale: '45%', reviews: 2},
      { id: 5, image: cardimage1, heading: 'Sparta Coffee Table', price: '$1300'  , discount: '$300' , sale: '70%', reviews: 3},
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

export const chairProducts: IChairProducts[] = [
  {
    id: 1,
    imageUrl: armChair,
    title: 'ARMCHAIRS'
  },
  {
    id: 2,
    imageUrl: armChair,
    title: 'ARMCHAIRS'
  },
]
