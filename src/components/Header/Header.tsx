import { NavLink } from 'react-router-dom';
import styles from './header.module.css';
import PathesEnum from '../../common/enums/pathes';
import { useTheme } from '../../context/ThemeContext';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const themeClass =
    theme === 'dark' ? styles['header--dark'] : styles['header--light'];
  return (
    <header className={`${styles['header']} ${themeClass}`}>
      <div className={styles['container']}>
        <div className={styles['header__row']}>
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
          <button
            className={styles['header__theme-btn']}
            onClick={toggleTheme}
          ></button>
        </div>
      </div>
    </header>
  );
};

export default Header;
