import {  IChairProducts, ISliderData, BannerImage, IDiscountProducts , IServiceItem, TSlide, ICard, ITestimonialCard,Country, City  } from '@/types/types';

import banner1 from '@images/banners/banner1.png';
import banner2 from '@images/banners/banner2.png';
import banner3 from '@images/banners/banner3.png';
import banner4 from '@images/banners/megasale.png';
import cardimage1 from '@images/imageeee.png';
import { FaSun, FaBullseye, FaEye } from 'react-icons/fa';

import palette from '@icons/palette.png';
import delivery from '@icons/delivery-fast.png';
import privacy from '@icons/privacy.png';
import support from '@icons/chat-46.png';
import opal from '@images/products/OPALdiningtable_900x900S.png'
import armChair from '@images/products/armchair.png'
import profileimage1 from '@images/profile/Ellipse 4.png'
import { link } from 'fs';

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
      { id: 3, image: cardimage1, heading: 'Sparta Coffee Table', price: '$200' , discount: '$300' , sale: '50%' , reviews: 0},
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
      { id: 5, image: cardimage1, heading: 'Sparta Coffee Table', price: '$1300'  , discount: '$300' , sale: '70%', reviews: 0},
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

export const cards: ICard[] = [

  { id: 1, image: cardimage1, heading: 'Sparta Coffee Table', price: '$100' , discount: '$300' , sale: '50%' , reviews: 3},
  { id: 2, image: cardimage1, heading: 'Sparta Coffee Table', price: '$150' , discount: '$300' , sale: '30%' , reviews: 5},
  { id: 3, image: cardimage1, heading: 'Sparta Coffee Table', price: '$200' , discount: '$300' , sale: '50%' , reviews: 2},
  { id: 4, image: cardimage1, heading: 'Sparta Coffee Table', price: '$250' , discount: '$300' , sale: '45%' , reviews: 0},
  { id: 5, image: cardimage1, heading: 'Sparta Coffee Table', price: '$300' , discount: '$300' , sale: '70%' , reviews: 4},
  { id: 6, image: cardimage1, heading: 'Sparta Coffee Table', price: '$300' , discount: '$300' , sale: '70%' , reviews: 5},
]

export const testimonialcards: ITestimonialCard[] = [

  { id: 1, profile: profileimage1, name: 'Sparta Coffee Table', comment: 'It is very comfortable because there is free internet for tasks, and cheap food', reviews: 3},
  { id: 2, profile: profileimage1, name: 'Sparta Coffee Table', comment: 'It is very comfortable because there is free internet for tasks, and cheap food', reviews: 5},
  { id: 3, profile: profileimage1, name: 'Sparta Coffee Table', comment: 'It is very comfortable because there is free internet for tasks, and cheap food', reviews: 2},
  { id: 4, profile: profileimage1, name: 'Sparta Coffee Table', comment: 'It is very comfortable because there is free internet for tasks, and cheap food', reviews: 5},
  { id: 5, profile: profileimage1, name: 'Sparta Coffee Table', comment: 'It is very comfortable because there is free internet for tasks, and cheap food', reviews: 4},
  { id: 6, profile: profileimage1, name: 'Sparta Coffee Table', comment: 'It is very comfortable because there is free internet for tasks, and cheap food', reviews: 5},
]

export const productData = [
  {
    link:"/",
    image: cardimage1,
    name: "Sparta Coffee Table",
    price: 150.00,
    originalPrice: 300.00,
    discount: "-50%",
    rating: 3,
  },
  {
    link:"/",
    image: cardimage1,
    name: "Athena Dining Table",
    price: 200.00,
    originalPrice: 400.00,
    discount: "-50%",
    rating: 4,
  },
  {
    link:"/",
    image: cardimage1,
    name: "Athena Dining Table",
    price: 200.00,
    originalPrice: 400.00,
    discount: "-50%",
    rating: 4,
  },
  // Add more products as needed
];

export const data = {
  paragraphs: [
    "Having been established in the UAE for over a decade, the time was right to have a division solely focussed on sourcing and buying the best pieces of unique, modern furniture for your home. The owners are passionate about furnishings and every item selected is something worthy of their own homes. Our buyers spend time hand testing each and every product.",
    "We visit the factories personally to ensure staff welfare. We take important steps in speaking to the factory staff to be certain that they are treated with respect and dignity and receiving their salaries on time. Any factory that doesn't adhere to our strict stipulations are struck off from our supply chain. Every item is quality checked before being loaded onto containers bound for our warehouse in Dubai.",
    "Our team at source are paid bonuses to find faults, making it more stringent that goods don't pass this stage easily. Once the products arrive in the UAE, they are once again meticulously checked for any flaws or faults.",
    "Only then are they assigned a shelf space and available to sell. Another unique trait of ours is the Try Before You Buy guarantee. This allows you to order any item which we deliver and assemble in your home and give you 30 mins to really test and decide if you're satisfied with your selection. If you are, then great. If not, we will simply repack the item and refund your money by the next day time taken for the money to reach your account varies from bank to bank. The TBYB guarantee is available on the majority of items on our website. Those items not a part of this guarantee will be clearly marked."
  ]
};
export const products = [
  { id: 1, name: 'Sparta Coffee Table', price: 123.45, originalPrice: 200.00, imageUrl: cardimage1 },
  { id: 2, name: 'Sparta Coffee Table', price: 123.45, originalPrice: 200.00, imageUrl: cardimage1 },
  { id: 3, name: 'Sparta Coffee Table', price: 123.45, originalPrice: 200.00, imageUrl: cardimage1 },
];

// Country data
export const countries: Country[] = [
  { code: 'AE', name: 'United Arab Emirates' },
  { code: 'KW', name: 'Kuwait' },
  { code: 'SA', name: 'Saudi Arabia' },
  { code: 'QA', name: 'Qatar' },
];

// City data
export const cities: City[] = [
  { country: 'AE', name: 'Dubai' },
  { country: 'AE', name: 'Abu Dhabi' },
  { country: 'KW', name: 'Kuwait City' },
  { country: 'KW', name: 'Al Ahmadi' },
  { country: 'SA', name: 'Riyadh' },
  { country: 'SA', name: 'Jeddah' },
  { country: 'QA', name: 'Doha' },
  { country: 'QA', name: 'Al Rayyan' },
];