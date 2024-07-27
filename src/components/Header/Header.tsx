import { NavLink } from 'react-router-dom';
import styles from './header.module.css';
import PathesEnum from '../../common/enums/pathes';
import { useTheme } from '../../context/ThemeContext';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const themeClass =
    theme === 'dark' ? styles['headerDark'] : styles['headerLight'];
  return (
    <header className={`${styles['header']} ${themeClass}`}>
      <div className={styles['container']}>
        <div className={styles['headerRow']}>
          <nav className={styles['headerNav']}>
            <NavLink
              to={PathesEnum.home}
              className={({ isActive }) =>
                isActive ? styles['linkActive'] : styles['link']
              }
            >
              Home
            </NavLink>
          </nav>
          <button
            className={styles['headerThemeBtn']}
            onClick={toggleTheme}
          ></button>
        </div>
      </div>
    </header>
  );
};

export default Header;
