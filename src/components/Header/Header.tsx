import React from 'react';
import logo from '@/assets/images/graphql-logo.svg';
import Image from 'next/image';
import HeaderMenu from '@/components/ui/HeaderMenu/HeaderMenu';
import HeaderBurger from '@/components/ui/HeaderBurger/HeaderBurger';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="h-12 flex justify-between items-center bg-color-dark-purple pl-[2%] pr-[2%] z-10">
      <Link
        href="/"
        className="h-full w-16 flex justify-center items-center border-r-color-dark-grey border-r-[1px] "
      >
        <Image className="m-0" width={33} height={35} src={logo} alt={'logo'} />
      </Link>
      <HeaderMenu isBurger={false} classes={'hidden sm:flex'} />
      <HeaderBurger />
    </header>
  );
};

export default Header;
