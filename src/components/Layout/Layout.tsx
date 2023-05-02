import React from 'react';
import Header from '../Header/Header';

interface IProps {
  children: JSX.Element | JSX.Element[];
}

const Layout = ({ children }: IProps) => (
  <>
    <Header />
    <main>{children}</main>
  </>
);

export default Layout;
