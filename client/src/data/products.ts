import { IProduct } from '@/types/types';
import productImg1 from '@images/products/imageeee.png';
import { Description } from '@radix-ui/react-dialog';

export const paymentIcons = [
  { src: '/images/paymentIcons/Mastercard-Logo.webp', alt: 'Mastercard' },
  { src: '/images/paymentIcons/visacard-logo.webp', alt: 'visacard' },
  { src: '/images/paymentIcons/apply-pay-black.webp', alt: 'applypay' },
  { src: '/images/paymentIcons/googlepay-logo.webp', alt: 'googlepay' },
 
];

export const SliderImages = [
  { src: '/images/HomeSliderImage/exclusive.webp', alt: 'exclusive' },
  { src: '/images/HomeSliderImage/fresh.webp', alt: 'exclusive' },
  { src: '/images/HomeSliderImage/popular.webp', alt: 'exclusive' },
];
export const bannerData = {
  imageUrl: '/images/catalogue/sofa.png', 
  title: 'CATALOGUE' ,
  buttonText: 'DOWNLOAD ',
  fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',    
};
export const ColorBannerData = {
  imageUrl: '/images/catalogue/bannerChirs.png', 
  TopTitle: 'avenue39',
  Heading: 'Design Chair',
  ShortText: 'is simply dummy text',
  Description: 'Lorem Ipsum has been the industry`s standard dummy text ever since the 1500s, when an unknown printer took',

};

export interface AdditionalInformation {
  key?: string;
  value?: string;
  colors?: string[];
  dimension?: string[];
}
export const products: IProduct[] = [
  {
    id: 5,
    name: 'Smartphone',
    price: 699,
    description:
      'Lovely coffee table with matching side table to give that modern look with function. Smoked glass and a marble top blend together great, giving you the luxury feel and finishing. Made from a solid wood frame and available for pre order today.',
    stock: 50,
    discountPrice: 649,
    posterImageUrl: productImg1,
    posterImagePublicId: 'smartphone_img',
    hoverImageUrl: 'https://example.com/smartphone_hover.jpg',
    hoverImagePublicId: 'smartphone_hover_img',
    productImages: [
      {
        imageUrl:
          'https://furniturezone.pk/wp-content/uploads/2024/03/4-Seater-Interchangeable-L-Shape-Sofa-Set3.jpg',
        public_id: 'abc',
      },
      {
        imageUrl:
          'https://furniturezone.pk/wp-content/uploads/2024/03/4-Seater-Interchangeable-L-Shape-Sofa-Set1.jpg',
        public_id: 'abc',
      },

      {
        imageUrl:
          'https://furniturezone.pk/wp-content/uploads/2024/03/4-Seater-Interchangeable-L-Shape-Sofa-Set4.jpg',
        public_id: 'abc',
      },
      {
        imageUrl:
          'https://furniturezone.pk/wp-content/uploads/2024/03/4-Seater-Interchangeable-L-Shape-Sofa-Set6.jpg',
        public_id: 'abc',
      },
    ],
    additionalInformation: [
      {
        key: 'Colors',
        value: 'red, blue',
      },
      {
        key: 'Dimension',
        value: '10x10, 20x20',
      },
      {
        key: 'Material',
        value: 'metal, plastic',
      },
    ],
    categoriesId: 3,
  },
  {
    id: 6,
    name: 'Sofa',
    price: 899,
    description: 'A comfortable 3-seater sofa.',
    stock: 20,
    discountPrice: 799,
    posterImageUrl: productImg1,
    posterImagePublicId: 'sofa_img',
    hoverImageUrl: 'https://example.com/sofa_hover.jpg',
    hoverImagePublicId: 'sofa_hover_img',
    productImages: [
      {
        imageUrl:
          'https://furniturezone.pk/wp-content/uploads/2024/03/4-Seater-Interchangeable-L-Shape-Sofa-Set3.jpg',
        public_id: 'abc',
      },
      {
        imageUrl:
          'https://furniturezone.pk/wp-content/uploads/2024/03/4-Seater-Interchangeable-L-Shape-Sofa-Set1.jpg',
        public_id: 'abc',
      },
      {
        imageUrl:
          'https://furniturezone.pk/wp-content/uploads/2024/03/4-Seater-Interchangeable-L-Shape-Sofa-Set6.jpg',
        public_id: 'abc',
      },
      {
        imageUrl:
          'https://furniturezone.pk/wp-content/uploads/2024/03/4-Seater-Interchangeable-L-Shape-Sofa-Set2.jpg',
        public_id: 'abc',
      },
      {
        imageUrl:
          'https://furniturezone.pk/wp-content/uploads/2024/03/4-Seater-Interchangeable-L-Shape-Sofa-Set4.jpg',
        public_id: 'abc',
      },
      {
        imageUrl:
          'https://furniturezone.pk/wp-content/uploads/2024/03/4-Seater-Interchangeable-L-Shape-Sofa-Set6.jpg',
        public_id: 'abc',
      },
    ],
    additionalInformation: [
      {
        key: 'Colors',
        value: 'red, blue',
      },
      {
        key: 'Dimension',
        value: '10x10, 20x20',
      },
    ],
    categoriesId: 4,
  },
  {
    id: 8,
    name: 'test',
    price: 699,
    description: 'Latest smartphone with advanced features.',
    stock: 100,
    discountPrice: 599,
    posterImageUrl: productImg1,
    posterImagePublicId: 'smartphone-x-public-id',
    hoverImageUrl: 'https://example.com/smartphone-x-hover.jpg',
    hoverImagePublicId: 'smartphone-x-hover-id',
    productImages: [
      {
        imageUrl:
          'https://furniturezone.pk/wp-content/uploads/2024/03/4-Seater-Interchangeable-L-Shape-Sofa-Set3.jpg',
        public_id: 'abc',
      },
      {
        imageUrl:
          'https://furniturezone.pk/wp-content/uploads/2024/03/4-Seater-Interchangeable-L-Shape-Sofa-Set1.jpg',
        public_id: 'abc',
      },
      {
        imageUrl:
          'https://furniturezone.pk/wp-content/uploads/2024/03/4-Seater-Interchangeable-L-Shape-Sofa-Set6.jpg',
        public_id: 'abc',
      },
      {
        imageUrl:
          'https://furniturezone.pk/wp-content/uploads/2024/03/4-Seater-Interchangeable-L-Shape-Sofa-Set2.jpg',
        public_id: 'abc',
      },
      {
        imageUrl:
          'https://furniturezone.pk/wp-content/uploads/2024/03/4-Seater-Interchangeable-L-Shape-Sofa-Set4.jpg',
        public_id: 'abc',
      },
      {
        imageUrl:
          'https://furniturezone.pk/wp-content/uploads/2024/03/4-Seater-Interchangeable-L-Shape-Sofa-Set6.jpg',
        public_id: 'abc',
      },
    ],
    additionalInformation: [
      {
        colors: ['red', 'l', 'red'],
      },
      {
        dimension: ['10*10', '20*20'],
      },
    ],
    categoriesId: 3,
  },
];
