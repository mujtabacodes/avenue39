import type { Metadata } from 'next';
import './globals.css';
import '@styles/style.css';
import localFont from 'next/font/local';
import Providers from '@/redux/provider';
import PathnameWrapper from '@/components/PathnameWrapper';
import { ToastContainer } from 'react-toastify';

const Helvetica = localFont({
  src: [
    {
      path: '../../public/font/HelveticaNeueRoman.otf',
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
      <body
       className={` ${Helvetica.className}`}
      >
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
