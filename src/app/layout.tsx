import React from 'react';
import './globals.css';
import { Inter } from 'next/font/google';
import { Metadata } from 'next';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "DevStreamline",
  description: "Effortlessly enhance your coding workflow with tailored tools for developers.",
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default Layout;