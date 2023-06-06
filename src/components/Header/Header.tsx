import React, { useEffect, useState } from 'react';
import logo from '@/assets/images/graphql-logo.svg';
import Image from 'next/image';
import HeaderMenu from '@/components/ui/HeaderMenu/HeaderMenu';
import HeaderBurger from '@/components/ui/HeaderBurger/HeaderBurger';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Header = () => {
  const router = useRouter();

  const [headerColor, setHeaderColor] = useState('color-dark-purple');
  const handleSticky = () => {
    if (window.scrollY >= 48) {
      setHeaderColor(() => 'color-purple');
    } else {
      setHeaderColor(() => 'color-dark-purple');
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleSticky);
    return () => {
      window.removeEventListener('scroll', handleSticky);
    };
  }, []);

  return (
    <header
      className={`h-12 flex fixed right-0 left-0 duration-300 justify-between items-center bg-${headerColor} pl-[2%] pr-[2%] z-20`}
    >
      <Link
        href={`/`}
        locale={router.locale}
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
