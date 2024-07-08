import { Component } from 'react';
import styles from './error-page.module.css';

class ErrorPage extends Component {
  handleResetSubmit = (): void => {
    localStorage.setItem('searchQuery', '');
  };
  render() {
    return (
      <>
        <form onSubmit={this.handleResetSubmit}>
          <div className={styles.container}>
            <h1>Error</h1>
            <button className={styles.reset} type="submit">
              Reset
            </button>
          </div>
        </form>
      </>
    );
  }
}

export default ErrorPage;
