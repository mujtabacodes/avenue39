import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import './globals.css';
import '@styles/style.css';
import localFont from 'next/font/local';
import Providers from '@/redux/provider';
import PathnameWrapper from '@/components/PathnameWrapper';
import { ToastContainer } from 'react-toastify';

const inter = Open_Sans({ subsets: ['latin'], variable: '--font-inter' });

const belgium = localFont({
  src: [
    {
      path: '../../public/font/belgium/Fonts/Belgium.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
});

const jadyn = localFont({
  src: [
    {
      path: '../../public/font/jadyn/Jadyn Maria.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
});

export const metadata: Metadata = {
  title: 'Avenue 39',
  description: 'Best ecommerce website',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <PathnameWrapper>
            {children}
            <ToastContainer />
          </PathnameWrapper>
        </Providers>
      </body>
    </html>
  );
}
