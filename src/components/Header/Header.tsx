import React from 'react';
import { paths } from '../../utils/navigationsPath';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Header = () => {
  const { pathname } = useRouter();

  return (
    <>
      {paths.map(({ id, title, path }) => (
        <Link
          href={path}
          key={id}
          className={`mr-5 hover:underline-offset-2 hover:underline ${
            pathname === path ? 'underline underline-offset-2' : ''
          }`}
        >
          {title}
        </Link>
      ))}
    </>
  );
};

export default Header;
