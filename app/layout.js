import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import NavComp from '@/components/NavComp';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'ETTA',
  description: 'non-profit Edtech',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastContainer position="bottom-center" autoClose={1000} />
        <main className="app">
          <NavComp />
          {children}
        </main>
      </body>
    </html>
  );
}
