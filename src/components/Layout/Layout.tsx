import { Outlet } from 'react-router-dom';
import '../../App.css';
import Header from '../Header/Header';

export const Layout = () => {
  return (
    <>
      <Header />
      <main className="main">
        <div className="container">
          <Outlet />
        </div>
      </main>
    </>
  );
};
