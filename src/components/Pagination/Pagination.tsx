'use client';

import styles from './pagination.module.css';
import { useTheme } from '../../context/ThemeContext';
import { useRouter, useSearchParams } from 'next/navigation';

interface PaginationProps {
  totalCount: number;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({ totalCount, currentPage }) => {
  const { theme } = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams!.get('search') || '';
  const details = searchParams!.get('details') || '';
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
    if (currentPage) {
      return String(currentPage) === page ? styles.active : '';
    }
    return '';
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams({
      page: page.toString(),
    });
    if (searchQuery) {
      params.append('search', searchQuery);
    }
    if (details) {
      params.append('details', details);
    }
    router.push(`/?${params.toString()}`);
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
