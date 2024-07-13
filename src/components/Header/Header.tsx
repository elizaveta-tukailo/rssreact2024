import { NavLink } from 'react-router-dom';
import styles from './header.module.css';
import PathesEnum from '../../common/enums/pathes';

const Header: React.FC = () => {
  return (
    <header className={styles['header']}>
      <div className="container">
        <nav className={styles['header__nav']}>
          <NavLink
            to={PathesEnum.home}
            className={({ isActive }) =>
              isActive ? styles['link-active'] : styles['link']
            }
          >
            Home
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
