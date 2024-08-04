import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import ErrorBoundary from '../components/ErrorBoundary';
import { setupStore, wrapper } from '../store/store';
import { ThemeProvider } from '../context/ThemeContext';

const store = setupStore();

 
export function App({ Component, pageProps }: AppProps) {
    return (
        <ErrorBoundary>
          <Provider store={store}>
          <ThemeProvider>
            <Component {...pageProps} />
            </ThemeProvider>
          </Provider>
        </ErrorBoundary>
      );
}
export default wrapper.withRedux(App);