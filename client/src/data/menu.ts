import icon3 from '@icons/3.png';
import icon2 from '@icons/2.png';
import icon5 from '@icons/5.png';
import { MenuData } from '@/types/types';

export const menuData: MenuData = {
  dining: [
    { link: '/products', title: 'Dining Table', icon: icon3 },
    { link: '/products', title: 'Dining Chairs', icon: icon2 },
    { link: '/products', title: 'Side Cabinets', icon: icon2 },
  ],
  living: [
    { link: '/products', title: 'Living Storage', icon: icon3 },
    { link: '/products', title: 'Sofas', icon: icon2 },
    { link: '/products', title: 'Armchairs', icon: icon3 },
    { link: '/products', title: 'Accent Chairs', icon: icon2 },
    { link: '/products', title: 'Cofee Tables', icon: icon2 },
    { link: '/products', title: 'TV Cabinets', icon: icon2 },
    { link: '/products', title: 'Side Table', icon: icon2 },
  ],
  bedroom: [
    { link: '/products', title: 'Beds', icon: icon3 },
    { link: '/products', title: 'Chest of Draws', icon: icon2 },
    { link: '/products', title: 'Wardrobe', icon: icon3 },
  ],
  homeOffice: [
    { link: '/products', title: 'Desks', icon: icon2 },
  ],
  chairs: [
    { link: '/products', title: 'Leisure Chair', icon: icon2 },
    { link: '/products', title: 'Armchairs', icon: icon3 },
    { link: '/products', title: 'Accent Chairs', icon: icon2 },
    { link: '/products', title: 'Sofas', icon: icon5 },
  ],
  tables: [
    { link: '/products', title: 'Coffee Tables', icon: icon5 },
    { link: '/products', title: 'Dining Tables', icon: icon2 },
    { link: '/products', title: 'Office Tables', icon: icon3 },
    { link: '/products', title: 'Side Tables', icon: icon2 },

  ],

  Lighting: [
    { link: '/products', title: 'Floor Lamps', icon: icon2 },
    { link: '/products', title: 'Table Lamps', icon: icon2 },
  ],
  tvCabinets: [{ link: '/products', title: 'TV Cabinets', icon: icon3 }],
  clearance: [{ link: '/products', title: 'Clearance', icon: icon3 }],
  megaSale: [{ link: '/products', title: '', icon: icon3 }],
};
