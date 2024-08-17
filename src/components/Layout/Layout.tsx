import { Outlet } from 'react-router-dom';
import '../../styles/index.scss';
import Header from '../Header/Header';
import styles from './Layout.module.css';

export const Layout = () => {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
    </>
  );
};
