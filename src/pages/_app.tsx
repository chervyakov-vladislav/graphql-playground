import '../styles/globals.css';

import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';

import Layout from '../components/Layout/Layout';
import { wrapper } from '../store/store';
import { CssBaseline } from '@mui/material';
import { StyledEngineProvider } from '@mui/material/styles';

export function App({ Component, pageProps }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(pageProps);
  return (
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <CssBaseline />
        <Layout>
          <Component {...props.pageProps} />
        </Layout>
      </StyledEngineProvider>
    </Provider>
  );
}

export default App;
