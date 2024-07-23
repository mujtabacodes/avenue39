import { IDiscountProducts, IServiceItem, TSlide } from '@/types/types';
import palette from '@icons/palette.png';
import delivery from '@icons/delivery-fast.png';
import privacy from '@icons/privacy.png';
import support from '@icons/chat-46.png';
import banner1 from '@images/banners/banner1.png';
import banner2 from '@images/banners/banner2.png';
import banner3 from '@images/banners/banner3.png';
import opal from '@images/products/OPALdiningtable_900x900S.png'

export const slides: TSlide[] = [
  {
    image: banner1,
    text: 'Slide 1 Text 2',
    buttonText: 'Learn More',
    buttonLink: '#',
  },
  {
    image: banner2,
    text: 'Slide 2 Text',
    buttonText: 'Shop Now',
    buttonLink: '#',
  },
  {
    image: banner3,
    text: 'Slide 3 Text',
    buttonText: 'Discover',
    buttonLink: '#',
  },
];

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