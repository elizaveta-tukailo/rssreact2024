import { PureComponent } from 'react';
import classes from './Search.module.css';
import { InputValue } from '../../types';

class Search extends PureComponent {
  state: InputValue = {
    value: '',
  };
  handleFormSubmit = (): void => {
    const name = this.state.value;
    localStorage.setItem('Name', name);
  };
  handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value.toLowerCase();
    this.setState({ value: value });
  };

  render() {
    return (
      <form className={classes.search__form} onSubmit={this.handleFormSubmit}>
        <input
          className={classes.search__input}
          type="text"
          name="name"
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
