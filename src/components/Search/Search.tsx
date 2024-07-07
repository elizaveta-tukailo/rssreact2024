import { Component } from 'react';
import styles from './Search.module.css';

type searchQuery = {
  value: string;
};

class Search extends Component {
  state: searchQuery = {
    value: '',
  };

  handleFormSubmit = (): void => {
    const name = this.state.value;
    localStorage.setItem('searchQuery', name);
  };

  handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value.toLowerCase();
    this.setState({ value: value });
  };

  render() {
    return (
      <form className={styles.search__form} onSubmit={this.handleFormSubmit}>
        <input
          className={styles.search__input}
          type="text"
          name="name"
          placeholder="Type here"
          onChange={this.handleChange}
        />
        <button className={styles.search__button} type="submit">
          Search
        </button>
      </form>
    );
  }
}
export default Search;
