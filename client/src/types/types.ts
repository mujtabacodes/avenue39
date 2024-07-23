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

export interface containerprops {
  children: ReactNode;
  className?: string;
}

export type SliderSettings = {
  dots: boolean;
  infinite: boolean;
  speed: number;
  slidesToShow: number;
  slidesToScroll: number;
};

export type Slide = {
  image: string;
  text: string;
  buttonText: string;
  buttonLink: string;
};
