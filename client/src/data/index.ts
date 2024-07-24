import { IServiceItem, TSlide, BannerImage  } from '@/types/types';
import icon1 from '@icons/1.png';
import icon2 from '@icons/2.png';
import icon3 from '@icons/3.png';
import icon5 from '@icons/5.png';
import banner1 from '@images/banners/banner1.png';
import banner2 from '@images/banners/banner2.png';
import banner3 from '@images/banners/banner3.png';
import banner4 from '@images/banners/megasale.png';
export const slides: TSlide[] = [
  {
    image: banner1,
    bannerHeading: 'Build Your Home With Furniture',
    bannerSubHeading: 'Making Beautiful Your Home',
    text: 'Slide 1 Text 2',
    buttonText: 'Learn More',
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
    buttonText: 'Discover',
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
