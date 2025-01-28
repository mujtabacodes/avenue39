// src/fonts.js
import localFont from 'next/font/local';

// Default Helvetica font
export const Helvetica = localFont({
  src: [
    {
      path: '../../public/font/HelveticaNeueRoman.otf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-helvetica',
});

// Helveticalight font
export const Helveticalight = localFont({
  src: [
    {
      path: '../../public/font/HelveticaNeueRegular.ttf',
      weight: '300',
      style: 'normal',
    },
  ],
  variable: '--font-helvetica-light',
});

// Belgium font
export const belgium = localFont({
  src: [
    {
      path: '../../public/font/belgium/Fonts/Belgium.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-belgium',
});

// Jadyn font
export const jadyn = localFont({
  src: [
    {
      path: '../../public/font/jadyn/Jadyn Maria.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-jadyn',
});
