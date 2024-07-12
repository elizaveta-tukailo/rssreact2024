import styles from './not-found-page.module.css';
const NotFoundPage: React.FC = () => {
  return (
    <div className={styles['not-found']}>
      <div className={styles['not-found__title']}>
        404 Error! Page not found
      </div>
    </div>
  );
};
export default NotFoundPage;
