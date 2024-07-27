import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import './globals.css';
import '@styles/style.css';
import TopNav from '@/components/nav/top-nav';
import Navbar from '@/components/nav/nav-bar';
import MenuBar from '@/components/nav/menu-bar';
import BottomBar from '@/components/nav/bottom-bar';

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
        <BottomBar />
        {children}
      </body>
    </html>
  );
}
