import styles from './header.module.css';
import { useTheme } from '../../context/ThemeContext';
import Link from 'next/link';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const themeClass =
    theme === 'dark' ? styles['headerDark'] : styles['headerLight'];
  return (
    <header className={`${styles['header']} ${themeClass}`}>
      <div className={styles['container']}>
        <div className={styles['headerRow']}>
          <nav className={styles['headerNav']}>
            <Link href="/" className={styles['link']}>
              Home
            </Link>
          </nav>
          <button
            data-testid="theme-btn"
            className={styles['headerThemeBtn']}
            onClick={toggleTheme}
          ></button>
        </div>
      </div>
    </header>
  );
};

export default Header;
