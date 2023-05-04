import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

interface IProps {
  children: JSX.Element | JSX.Element[];
}

const Layout = ({ children }: IProps) => (
  <div className="flex min-h-screen flex-col p-0">
    <Header />
    <main className="grow flex">{children}</main>
    <Footer />
  </div>
);

export default Layout;
