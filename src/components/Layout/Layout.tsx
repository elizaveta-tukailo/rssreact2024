import { Outlet } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import Header from '../Header';
import styles from './layout.module.css';

const Layout: React.FC = () => {
  const { theme } = useTheme();
  const themeClass =
    theme === 'dark' ? styles['pageWrapDark'] : styles['pageWrapLight'];
  return (
    <div className={`${styles['pageWrap']} ${themeClass}`}>
      <Header />
      <div className={styles['container']}>
        <Outlet />
      </div>
    </div>
  );
};
export default Layout;
