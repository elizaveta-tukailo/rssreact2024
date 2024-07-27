import { Outlet } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import Header from '../Header';
import styles from './layout.module.css';

const Layout: React.FC = () => {
  const { theme } = useTheme();
  const themeClass =
    theme === 'dark' ? styles['page__wrap--dark'] : styles['page__wrap--light'];
  return (
    <div className={`${styles['page__wrap']} ${themeClass}`}>
      <Header />
      <div className={styles['container']}>
        <Outlet />
      </div>
    </div>
  );
};
export default Layout;
