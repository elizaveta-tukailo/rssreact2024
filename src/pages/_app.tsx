import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import ErrorBoundary from '../components/ErrorBoundary';
import { setupStore, wrapper } from '../store/store';
import { ThemeProvider } from '../context/ThemeContext';
import Layout from '../components/Layout';


export function App({ Component, pageProps }: AppProps) {
  const { store } = wrapper.useWrappedStore(pageProps);
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <ThemeProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  );
}
export default wrapper.withRedux(App);
