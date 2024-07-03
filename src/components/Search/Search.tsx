import { PureComponent } from 'react';
import classes from './Search.module.css';

class Search extends PureComponent {
  handleFormSubmit = (): void => {};
  handleChange = () => {};

  render() {
    return (
      <form className={classes.search__form} onSubmit={this.handleFormSubmit}>
        <input
          className={classes.search__input}
          type="text"
          name=""
          placeholder="Type here"
          onChange={this.handleChange}
        />
        <button className={classes.search__button} type="submit">
          Search
        </button>
      </form>
    );
  }
}
export default Search;
