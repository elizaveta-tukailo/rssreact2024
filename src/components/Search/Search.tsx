import { ChangeEvent } from 'react';
import useSearchQuery from '../../hooks/useSearchQuery';
import styles from './search.module.css';
import { useNavigate } from 'react-router-dom';

const Search: React.FC = () => {
  const [searchQuery, setSearchQuery] = useSearchQuery('searchQuery');
  const activeStyle = localStorage.getItem('activeCard');
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
    <div
      className={
        activeStyle === 'activeCard'
          ? `${styles['search__form-wrap']} ${styles['search__form-wrap--disabled']}`
          : `${styles['search__form-wrap']}`
      }
    >
      <form className={styles.search__form} onSubmit={handleFormSubmit}>
        <input
          className={styles.search__input}
          type="text"
          name="name"
          value={searchQuery}
          placeholder="Type here"
          onChange={handleChange}
        />
        <button className={styles.search__button} type="submit">
          Search
        </button>
      </form>
    </div>
  );
};
export default Search;
