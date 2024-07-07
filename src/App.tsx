import { Component } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import MainPage from './pages/MainPage';
import './App.css';

class App extends Component {
  render() {
    return (
      <>
        <ErrorBoundary>
          <MainPage />
        </ErrorBoundary>
      </>
    );
  }
}
export default App;
