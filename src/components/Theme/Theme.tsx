'use client';
import { useTheme } from '../../context/ThemeContext';
import styles from './theme.module.css';

interface ThemeProps {
  children: React.ReactNode;
}

const Theme = ({ children }: ThemeProps) => {
  const { theme } = useTheme();

  return <div className={`${styles.page} ${styles[theme]}`}>{children}</div>;
};

export default Theme;
