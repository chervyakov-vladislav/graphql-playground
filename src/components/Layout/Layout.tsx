import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { ParticlesBackground } from '@/components/ui/ParticlesBackground/ParticlesBackground';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from 'firebase.config';
import { useAppDispatch } from '@/store/hooks';
import { authActions } from '@/store/reducers/auth/authSlice';
import { useRouter } from 'next/router';

interface IProps {
  children: JSX.Element | JSX.Element[];
}

const Layout = ({ children }: IProps) => {
  const { pathname } = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(authActions.setIsLoading(true));
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        dispatch(
          authActions.setUser({
            id: userAuth.uid,
            token: userAuth.refreshToken,
            login: userAuth.email,
          })
        );
      } else {
        dispatch(authActions.removeUser());
      }
      dispatch(authActions.setIsLoading(false));
    });
  }, []);

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
