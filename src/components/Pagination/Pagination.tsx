import { useState } from 'react';
import styles from './pagination.module.css';
import { NavLink } from 'react-router-dom';

const Pagination = () => {
  const itemsCount = 862;
  const [page, setPage] = useState(1);
  const activeStyle = localStorage.getItem('active');

  const itemsPerPage = 20;
  const pages = [];
  const pagesCount = Math.ceil(itemsCount / itemsPerPage);
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  const currentPage = page;
  const maxPagesToShow = 6;
  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  let endPage = startPage + maxPagesToShow - 1;

  if (endPage > pagesCount) {
    endPage = pagesCount;
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  const paginationsOnPage = pages.slice(startPage - 1, endPage);

  return (
    <div
      className={
        activeStyle === 'activeCard'
          ? `container ${styles['disabled-pagination']}`
          : `container`
      }
    >
      <div className={styles.pagination}>
        {paginationsOnPage.map((page) => (
          <NavLink
            to={`/page/${page}`}
            className={({ isActive }) => (isActive ? styles.active : undefined)}
            key={page + 1}
            onClick={() => setPage(page)}
          >
            {page}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Pagination;
