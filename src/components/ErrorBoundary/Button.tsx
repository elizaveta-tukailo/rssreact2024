import { Component } from 'react';
import styles from './error-boundary.module.css';

class ErrorButton extends Component {
  state = {
    hasError: true,
  };
  handleErrorSubmit = () => {
    this.setState({ hasError: false });
  };
  render() {
    if (this.state.hasError) {
      return (
        <>
          <form onSubmit={this.handleErrorSubmit}>
            <button className={styles.error__button} type="submit">
              Error Button
            </button>
          </form>
        </>
      );
    } else {
      throw new Error('Error');
    }
  }
}

export default ErrorButton;
