import icon3 from '@icons/3.png';
import icon2 from '@icons/2.png';
import icon5 from '@icons/5.png';
import { MenuData } from '@/types/types';

export const menuData: MenuData = {
  dining: [
    { link: '/products', title: 'Dining Tables', icon: icon3 },
    { link: '/products', title: 'Dining Chairs', icon: icon2 },
    { link: '/products', title: 'Side Cabinets', icon: icon2 },
    { link: '/products', title: 'Accessories', icon: icon2 },
  ],
  living: [
    { link: '/products', title: 'Sofas', icon: icon2 },
    { link: '/products', title: 'Armchairs', icon: icon3 },
    { link: '/products', title: 'Accent Chairs', icon: icon2 },
    { link: '/products', title: 'TV Cabinets', icon: icon2 },
    { link: '/products', title: 'Side Table', icon: icon2 },
    { link: '/products', title: 'Cofee Tables', icon: icon2 },
    { link: '/products', title: 'Sofa Beds', icon: icon3 },
    { link: '/products', title: 'Accessories', icon: icon2 },

  ],
  bedroom: [
    { link: '/products', title: 'Table Lamps', icon: icon3 },
    { link: '/products', title: 'Bedside Tables', icon: icon2 },
    { link: '/products', title: 'TV Cabinets', icon: icon2 },
    { link: '/products', title: 'Sofa Beds', icon: icon3 },
    { link: '/products', title: 'Accessories', icon: icon2 },

  ],
  chairs: [
    { link: '/products', title: 'Armchairs', icon: icon3 },
    { link: '/products', title: 'Accent Chairs', icon: icon2 },
    { link: '/products', title: 'Sofas', icon: icon5 },
    { link: '/products', title: 'Dining Chairs', icon: icon2 },
    { link: '/products', title: 'Barstools', icon: icon2 },
  ],
  tables: [
    { link: '/products', title: 'Dining Tables', icon: icon2 },
    { link: '/products', title: 'Office Tables', icon: icon3 },
    { link: '/products', title: 'Side Tables', icon: icon2 },
    { link: '/products', title: 'Coffee Tables', icon: icon5 },
    { link: '/products', title: 'Bedside Tables', icon: icon2 },
  ],
  homeOffice: [
    { link: '/products', title: 'Office Tables', icon: icon3 },
    { link: '/products', title: 'Office Chairs', icon: icon3 },
  ],
  Lighting: [
    { link: '/products', title: 'Floor Lamps', icon: icon2 },
    { link: '/products', title: 'Table Lamps', icon: icon2 },
  ],
  Accessories: [{ link: '/products', title: 'Accessories', icon: icon3 }],
  NewArrivals: [{ link: '/products', title: 'NewArrivals', icon: icon3 }],
  clearance: [{ link: '/products', title: 'Clearance', icon: icon3 }],
  megaSale: [{ link: '/products', title: '', icon: icon3 }],
};
