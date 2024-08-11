import { ChangeEvent } from 'react';
import useSearchQuery from '../../hooks/useSearchQuery';
import styles from './search.module.css';
import { useTheme } from '../../context/ThemeContext';
import { useRouter } from 'next/router';

const Search: React.FC = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useSearchQuery('searchQuery');

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (typeof window !== 'undefined') {
      localStorage.setItem('searchQuery', searchQuery);
    }
    const newQuery = {
      page: '1',
      search: searchQuery,
      ...(router.query.details && { details: router.query.details }),
    };
    router.push({ pathname: router.pathname, query: newQuery });
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (typeof window !== 'undefined') {
      setSearchQuery(event.target.value);
    }
  };

  return (
    <div className={`${styles['searchFormWrap']} ${styles[theme]}`}>
      <form className={styles.searchForm} onSubmit={handleFormSubmit}>
        <input
          className={styles.searchInput}
          type="text"
          name="name"
          value={searchQuery}
          placeholder="Type here"
          onChange={handleChange}
        />
        <button className={styles.searchButton} type="submit">
          Search
        </button>
      </form>
    </div>
  );
};
export default Search;
