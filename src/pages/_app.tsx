import '../styles/globals.css';

import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';

import Layout from '../components/Layout/Layout';
import { setupStore } from '@/store/store';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={setupStore()}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
