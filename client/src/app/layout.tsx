import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import './globals.css';
import '@styles/style.css';
import Providers from '@/redux/provider';
import PathnameWrapper from '@/components/PathnameWrapper';
import { ToastContainer } from 'react-toastify';

const inter = Open_Sans({ subsets: ['latin'] });

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
      <body className={inter.className}>
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
