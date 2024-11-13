import icon3 from '@icons/3.png';
import icon2 from '@icons/2.png';
import icon5 from '@icons/5.png';
import { MenuData } from '@/types/types';

export const menuData: MenuData = {
  dining: [
    {categoryId: 3 , link: '/products', title: 'Dining Tables', icon: icon3 },
    {categoryId: 3 , link: '/products', title: 'Dining Chairs', icon: icon2 },
    {categoryId: 3 , link: '/products', title: 'Side Cabinets', icon: icon2 },
    {categoryId: 3 , link: '/products', title: 'Accessories', icon: icon2 },
  ],
  living: [
    {categoryId: 4 , link: '/products', title: 'Sofas', icon: icon2 },
    {categoryId: 4 , link: '/products', title: 'Armchairs', icon: icon3 },
    {categoryId: 4 , link: '/products', title: 'Accent Chairs', icon: icon2 },
    {categoryId: 4 , link: '/products', title: 'TV Cabinets', icon: icon2 },
    {categoryId: 4 , link: '/products', title: 'Side Table', icon: icon2 },
    {categoryId: 4 , link: '/products', title: 'Coffee Tables', icon: icon2 },
    {categoryId: 4 , link: '/products', title: 'Sofa Beds', icon: icon3 },
    {categoryId: 4 , link: '/products', title: 'Accessories', icon: icon2 },

  ],
  bedroom: [
    {categoryId: 5 , link: '/products', title: 'Table Lamps', icon: icon3 },
    {categoryId: 5 , link: '/products', title: 'Bedside Tables', icon: icon2 },
    {categoryId: 5 , link: '/products', title: 'TV Cabinets', icon: icon2 },
    {categoryId: 5 , link: '/products', title: 'Sofa Beds', icon: icon3 },
    {categoryId: 5 , link: '/products', title: 'Accessories', icon: icon2 },

  ],
  chairs: [
    {categoryId: 6 , link: '/products', title: 'Armchairs', icon: icon3 },
    {categoryId: 6 , link: '/products', title: 'Accent Chairs', icon: icon2 },
    {categoryId: 6 , link: '/products', title: 'Sofas', icon: icon5 },
    {categoryId: 6 , link: '/products', title: 'Dining Chairs', icon: icon2 },
    {categoryId: 6 , link: '/products', title: 'Barstools', icon: icon2 },
  ],
  tables: [
    {categoryId: 7 , link: '/products', title: 'Dining Tables', icon: icon2 },
    {categoryId: 7 , link: '/products', title: 'Office Tables', icon: icon3 },
    {categoryId: 7 , link: '/products', title: 'Side Tables', icon: icon2 },
    {categoryId: 7 , link: '/products', title: 'Coffee Tables', icon: icon5 },
    {categoryId: 7 , link: '/products', title: 'Bedside Tables', icon: icon2 },
  ],
  homeOffice: [
    {categoryId: 8 , link: '/products', title: 'Office Tables', icon: icon3 },
    {categoryId: 8 , link: '/products', title: 'Office Chairs', icon: icon3 },
  ],
  Lighting: [
    {categoryId: 9 , link: '/products', title: 'Floor Lamps', icon: icon2 },
    {categoryId: 9 , link: '/products', title: 'Table Lamps', icon: icon2 },
  ],
  Accessories: [{ link: '/products', title: 'Accessories', icon: icon3 }],
  NewArrivals: [{ link: '/products', title: 'new-arrivals', icon: icon3 }],
  clearance: [{ link: '/products', title: 'Clearance', icon: icon3 }],
  megaSale: [{ link: '/products', title: '', icon: icon3 }],
};
