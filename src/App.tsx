import { Component } from 'react';
import Search from './components/Search/Search';
import MainPage from './components/MainPage/MainPage';

class App extends Component {
  render() {
    return (
      <>
        <header>
          <Search />
        </header>
        <MainPage />
      </>
    );
  }
}
export default App;
