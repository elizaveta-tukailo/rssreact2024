'use client';
import { useState } from 'react';
import styles from './error-boundary.module.css';
import { useTheme } from '../../context/ThemeContext';

const ErrorButton = () => {
  const [hasError, sethasError] = useState(true);
  const { theme } = useTheme();
  const handleErrorSubmit = () => {
    sethasError(false);
  };
  if (hasError) {
    return (
      <>
        <form onSubmit={handleErrorSubmit}>
          <button
            className={`${styles.error__button} ${styles[theme]}`}
            type="submit"
          >
            Error Button
          </button>
        </form>
      </>
    );
  } else {
    throw new Error('Error');
  }
};

export default ErrorButton;
