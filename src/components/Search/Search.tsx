import { ChangeEvent } from 'react';
import useSearchQuery from '../../hooks/useSearchQuery';
import styles from './search.module.css';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

const Search: React.FC = () => {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useSearchQuery('searchQuery');
  const navigate = useNavigate();

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    navigate(`?search=${searchQuery}`);
    localStorage.setItem('searchQuery', searchQuery);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
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
