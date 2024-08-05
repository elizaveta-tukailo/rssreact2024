import { useTheme } from '../../context/ThemeContext';
import Header from '../Header';
import styles from './layout.module.css';

interface LayoutProps {
  children: React.ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { theme } = useTheme();
  const themeClass =
    theme === 'dark' ? styles['pageWrapDark'] : styles['pageWrapLight'];
  return (
    <div className={`${styles['pageWrap']} ${themeClass}`}>
      <Header />
      <div className={styles['container']}>
        <main>{children}</main>
      </div>
    </div>
  );
};
export default Layout;
