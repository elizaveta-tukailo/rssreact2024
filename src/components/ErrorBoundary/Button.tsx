import { useState } from 'react';
import styles from './error-boundary.module.css';

const ErrorButton = () => {
  const [hasError, sethasError] = useState(true);

  const handleErrorSubmit = () => {
    sethasError(false);
  };
  if (hasError) {
    return (
      <>
        <form onSubmit={handleErrorSubmit}>
          <button className={styles.error__button} type="submit">
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
