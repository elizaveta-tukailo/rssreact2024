import { useState } from 'react';
import styles from './search.module.css';

type searchQuery = {
  value: string;
};

const Search: React.FC = () => {
  const [formData, setFormData] = useState<searchQuery>({ value: '' });

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const name = formData.value;
    localStorage.setItem('searchQuery', name);
  };

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value.toLowerCase();
    setFormData({ value: value });
  };

  return (
    <form className={styles.search__form} onSubmit={handleFormSubmit}>
      <input
        className={styles.search__input}
        type="text"
        name="name"
        placeholder="Type here"
        onChange={handleChange}
      />
      <button className={styles.search__button} type="submit">
        Search
      </button>
    </form>
  );
};
export default Search;
