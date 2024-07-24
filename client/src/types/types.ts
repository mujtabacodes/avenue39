import { StaticImageData } from 'next/image';
import { ReactNode } from 'react';
import { IconType } from 'react-icons';

export interface IHome {}
export interface INav {}

export interface ITypo {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}
export interface ITextIcon {
  //TODO: change Icon type
  Icon: any;
  Title: string;
  link: string;
}

export interface IContainer {
  children: ReactNode;
  className?: string;
}

export type TSliderSettings = {
  dots: boolean;
  infinite: boolean;
  speed: number;
  slidesToShow: number;
  slidesToScroll: number;
};

export type TSlide = {
  image: any;
  text: string;
  buttonText: string;
  buttonLink: string;
};

export interface IServiceItem {
  id: number;
  icon: StaticImageData;
  title: string;
}

export interface IDiscountProducts {
  id: number;
  imageUrl: StaticImageData;
  title: string;
}

export interface IChairProducts {
  id: number;
  imageUrl: StaticImageData;
  title: string;
}