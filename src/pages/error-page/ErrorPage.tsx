import styles from './error-page.module.css';

const ErrorPage: React.FC = () => {
  const handleResetSubmit = () => {
    localStorage.setItem('searchQuery', '');
  };

  return (
    <form onSubmit={handleResetSubmit}>
      <div className={styles.container}>
        <h1>Error</h1>
        <button className={styles.reset} type="submit">
          Reset
        </button>
      </div>
    </form>
  );
};

export default ErrorPage;
