import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-multi-carousel/lib/styles.css';
import { ToastContainer } from 'react-toastify';
import NavComp from '@/components/NavComp';
import { Provider } from './Provider';
import Head from 'next/head';
const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'ETTA',
  description: 'non-profit Edtech',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Provider>
        <Head>
          <link rel="icon" href="./favicon.ico" />
        </Head>
        <body className={inter.className}>
          <ToastContainer position="bottom-center" autoClose={2000} />
          <main className="app">
            <NavComp />
            {children}
          </main>
        </body>
      </Provider>
    </html>
  );
}
