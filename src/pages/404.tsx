import styles from '../styles/not-found-page.module.css';

const NotFoundPage: React.FC = () => {
  return (
    <div className={styles['notFound']}>
      <div className={styles['notFoundTitle']}>404 Error! Page not found</div>
    </div>
  );
};
export default NotFoundPage;
