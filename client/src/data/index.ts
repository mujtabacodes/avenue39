import { IServiceItem, TSlide, SliderData, BannerImage  } from '@/types/types';
import icon1 from '@icons/1.png';
import icon2 from '@icons/2.png';
import icon3 from '@icons/3.png';
import icon5 from '@icons/5.png';
import banner1 from '@images/banners/banner1.png';
import banner2 from '@images/banners/banner2.png';
import banner3 from '@images/banners/banner3.png';
import banner4 from '@images/banners/megasale.png';
import cardimage1 from '@images/imageeee.png';
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
    icon: icon1,
    title: 'Unique Everything',
  },
  {
    id: 2,
    icon: icon2,
    title: 'Free Shipping & Return',
  },
  {
    id: 3,
    icon: icon3,
    title: 'Secure Payments',
  },
  {
    id: 4,
    icon: icon5,
    title: 'Support Customer',
  },
];

export const slidersData: SliderData[] = [
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
