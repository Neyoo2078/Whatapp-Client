import './globals.css';
import { Inter } from 'next/font/google';
import Provider from '../components/provider';
import Nav from '@/components/Nav';
import Store from '@/components/reduxprovider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'whatApp ',
  description: 'whatapp clone',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Store>
          <Provider>{children}</Provider>
        </Store>
        <div id="photo-picker-element"></div>
      </body>
    </html>
  );
}
