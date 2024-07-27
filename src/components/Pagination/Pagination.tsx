import styles from './pagination.module.css';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

interface PaginationProps {
  totalCount: number;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({ totalCount, currentPage }) => {
  const { theme } = useTheme();

  const itemsCount = totalCount;
  const searchQuery = localStorage.getItem('searchQuery');

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

  const searchParams = searchQuery ? `?search=${searchQuery}` : '';

  return (
    <div className="container">
      <div className={`${styles.pagination} ${styles[theme]}`}>
        {paginationsOnPage.map((page) => (
          <NavLink
            to={`/page/${page}${searchParams}`}
            className={({ isActive }) => (isActive ? styles.active : undefined)}
            key={page + 1}
          >
            {page}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Pagination;
