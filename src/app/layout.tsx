import React from 'react';
import { ThemeProvider } from '../context/ThemeContext';
import '../styles/globals.css';
import ProviderWrapper from './ProviderWrapper';
import Header from '../components/Header/Header';
import styles from '../styles/layout.module.css';
import Theme from '../components/Theme/Theme';

export const metadata = {
  title: 'Rick and Morty',
  description: 'Rick and Morty app',
};

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <ProviderWrapper>
          <ThemeProvider>
            <Theme>
              <div className={`${styles['pageWrap']}`}>
                <Header />
                <div className={styles['container']}>{children}</div>
              </div>
            </Theme>
          </ThemeProvider>
        </ProviderWrapper>
      </body>
    </html>
  );
};
export default RootLayout;
