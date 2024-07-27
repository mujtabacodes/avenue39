import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import './globals.css';
import '@styles/style.css';

import Footer from '@/components/footer/footer';
import MenuBar from '@/components/nav/menu-bar';
import Navbar from '@/components/nav/nav-bar';
import TopNav from '@/components/nav/top-nav';

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
        <TopNav />
        <Navbar />
        <MenuBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
