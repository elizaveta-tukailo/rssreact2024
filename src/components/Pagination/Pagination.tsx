import styles from './pagination.module.css';
import { useTheme } from '../../context/ThemeContext';
import { useRouter } from 'next/router';

interface PaginationProps {
  totalCount: number;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({ totalCount, currentPage }) => {
  const { theme } = useTheme();
  const router = useRouter();
  const { query } = router;

  const itemsCount = totalCount;
  const itemsPerPage = 20;
  const pages = [];
  const pagesCount = Math.ceil(itemsCount / itemsPerPage);
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  const maxPagesToShow = 6;
  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  let endPage = startPage + maxPagesToShow - 1;

  if (endPage > pagesCount) {
    endPage = pagesCount;
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  const paginationsOnPage = pages.slice(startPage - 1, endPage);

  const setActiveClass = (page: string) => {
    if (query.page) {
      return query.page === page ? styles.active : '';
    }
    return '';
  };

  const handlePageChange = (page: number) => {
    const newQuery = { ...query, page: String(page) };

    router.push({
      pathname: router.pathname,
      query: newQuery,
    });
  };

  return (
    <div className="container">
      <div className={`${styles.pagination} ${styles[theme]}`}>
        {paginationsOnPage.map((page) => (
          <div
            className={`${styles.paginationItem} ${setActiveClass(String(page))}`}
            key={page}
            onClick={() => {
              handlePageChange(page);
            }}
          >
            {page}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pagination;
