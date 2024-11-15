import icon3 from '@icons/3.png';
import icon2 from '@icons/2.png';
import icon5 from '@icons/5.png';
import diningTable from '@assets/menu-icons/dining-table.png';
import diningChair from '@assets/menu-icons/dining-chair.png';
import accessories from '@assets/menu-icons/furnitures.png';
import sideCabinets from '@assets/menu-icons/cabinet.png';
import sideTable from '@assets/menu-icons/side-table.png';
import sofa from '@assets/menu-icons/sofa.png';
import armchair from '@assets/menu-icons/armchair.png';
import sofaBed from '@assets/menu-icons/sofa-bed.png';
import accentChairs from '@assets/menu-icons/chair.png';
import officeChair from '@assets/menu-icons/office-chair.png';
import tvCabinets from '@assets/menu-icons/tv.png';
import coffeeTables from '@assets/menu-icons/coffee-table.png';
import tableLamps from '@assets/menu-icons/lamps.png';
import bedsideTables from '@assets/menu-icons/bedside-table.png';
import barstool from '@assets/menu-icons/bar-stool.png';
import officeTables from '@assets/menu-icons/desktop.png';
import floorLamps from '@assets/menu-icons/floor-lamp.png';
import { MenuData } from '@/types/types';

export const menuData: MenuData = {
  dining: [
    {
      categoryId: 3,
      link: '/products',
      title: 'Dining Tables',
      icon: diningTable,
    },
    {
      categoryId: 3,
      link: '/products',
      title: 'Dining Chairs',
      icon: diningChair,
    },
    {
      categoryId: 3,
      link: '/products',
      title: 'Side Cabinets',
      icon: sideCabinets,
    },
    {
      categoryId: 3,
      link: '/products',
      title: 'Accessories',
      icon: accessories,
    },
  ],
  living: [
    { categoryId: 4, link: '/products', title: 'Sofas', icon: sofa },
    { categoryId: 4, link: '/products', title: 'Armchairs', icon: armchair },
    {
      categoryId: 4,
      link: '/products',
      title: 'Accent Chairs',
      icon: accentChairs,
    },
    {
      categoryId: 4,
      link: '/products',
      title: 'TV Cabinets',
      icon: tvCabinets,
    },
    { categoryId: 4, link: '/products', title: 'Side Tables', icon: sideTable },
    {
      categoryId: 4,
      link: '/products',
      title: 'Coffee Tables',
      icon: coffeeTables,
    },
    { categoryId: 4, link: '/products', title: 'Sofa Beds', icon: sofaBed },
    {
      categoryId: 4,
      link: '/products',
      title: 'Accessories',
      icon: accessories,
    },
  ],
  bedroom: [
    {
      categoryId: 5,
      link: '/products',
      title: 'Table Lamps',
      icon: tableLamps,
    },
    {
      categoryId: 5,
      link: '/products',
      title: 'Bedside Tables',
      icon: bedsideTables,
    },
    {
      categoryId: 5,
      link: '/products',
      title: 'TV Cabinets',
      icon: tvCabinets,
    },
    { categoryId: 5, link: '/products', title: 'Sofa Beds', icon: sofaBed },
    {
      categoryId: 5,
      link: '/products',
      title: 'Accessories',
      icon: accessories,
    },
  ],
  chairs: [
    { categoryId: 6, link: '/products', title: 'Armchairs', icon: armchair },
    {
      categoryId: 6,
      link: '/products',
      title: 'Accent Chairs',
      icon: accentChairs,
    },
    { categoryId: 6, link: '/products', title: 'Sofas', icon: sofa },
    {
      categoryId: 6,
      link: '/products',
      title: 'Dining Chairs',
      icon: diningChair,
    },
    { categoryId: 6, link: '/products', title: 'Barstools', icon: barstool },
  ],
  tables: [
    {
      categoryId: 7,
      link: '/products',
      title: 'Dining Tables',
      icon: diningTable,
    },
    {
      categoryId: 7,
      link: '/products',
      title: 'Office Tables',
      icon: officeTables,
    },
    { categoryId: 7, link: '/products', title: 'Side Tables', icon: sideTable },
    {
      categoryId: 7,
      link: '/products',
      title: 'Coffee Tables',
      icon: coffeeTables,
    },
    {
      categoryId: 7,
      link: '/products',
      title: 'Bedside Tables',
      icon: bedsideTables,
    },
  ],
  homeOffice: [
    {
      categoryId: 8,
      link: '/products',
      title: 'Office Tables',
      icon: officeTables,
    },
    {
      categoryId: 8,
      link: '/products',
      title: 'Office Chairs',
      icon: officeChair,
    },
  ],
  Lighting: [
    {
      categoryId: 9,
      link: '/products',
      title: 'Floor Lamps',
      icon: floorLamps,
    },
    {
      categoryId: 9,
      link: '/products',
      title: 'Table Lamps',
      icon: tableLamps,
    },
  ],
  Accessories: [{ link: '/products', title: 'Accessories', icon: icon3 }],
  NewArrivals: [{ link: '/products', title: 'New Arrivals', icon: icon3 }],
  clearance: [{ link: '/products', title: 'Clearance', icon: icon3 }],
  megaSale: [{ link: '/products', title: '', icon: icon3 }],
};
