
import { Slide } from "../types/types";
import { IServiceItem } from "@/types/types";
export const slides: Slide[] = [
  {
    image: "assets/images/banner1.png",
    text: "Slide 1 Text",
    buttonText: "Learn More",
    buttonLink: "#",
  },
  {
    image: "assets/images/banner1.png",
    text: "Slide 2 Text",
    buttonText: "Shop Now",
    buttonLink: "#",
  },
  {
    image: "assets/images/banner1.png",
    text: "Slide 3 Text",
    buttonText: "Discover",
    buttonLink: "#",
  },
  // Add more slides as needed
];


export const serviceItems: IServiceItem[] = [
    {
        id: 1,
        icon: '/assets/palette.png',
        title: 'Unique Everything',
    },
    {
        id: 2,
        icon: '/assets/delivery-fast.png',
        title: 'Free Shipping & Return',
    },
    {
        id: 3,
        icon: '/assets/privacy.png',
        title: 'Secure Payments',
    },
    {
        id: 4,
        icon: '/assets/chat-46.png',
        title: 'Support Customer',
    },
]

