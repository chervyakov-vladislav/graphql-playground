import { useRouter } from 'next/router';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { ParticlesBackground } from '@/components/ui/ParticlesBackground/ParticlesBackground';

interface IProps {
  children: JSX.Element | JSX.Element[];
}

const Layout = ({ children }: IProps) => {
  const { pathname } = useRouter();

  return (
    <div className="flex min-h-screen flex-col p-0">
      <Header />
      {pathname === '/graphql' ? null : <ParticlesBackground />}
      <main className="grow flex">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
