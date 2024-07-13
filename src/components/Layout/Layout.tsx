import { Outlet } from 'react-router-dom';
import Header from '../Header';
import styles from './layout.module.css';

const Layout: React.FC = () => {
  return (
    <div className={styles['page__wrap']}>
      <Header />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};
export default Layout;
