import { PureComponent } from 'react';
import Loader from '../Loader/Loader';
import classes from './MainPage.module.css';
import { Item, State } from '../../types';
import PeopleItem from './PeopleItem';

class MainPage extends PureComponent {
  itemName = localStorage.getItem('Name');
  state: State = {
    error: null,
    isLoaded: false,
    items: [],
  };
  componentDidMount(): void {
    if (!this.itemName) {
      fetch(`https://swapi.dev/api/people/?page=1`)
        .then((res) => res.json())
        .then((result) => {
          this.setState({
            isLoaded: true,
            items: result.results,
          });
        });
    } else if (this.itemName == null) {
      fetch(`https://swapi.dev/api/people/?page=1`)
        .then((res) => res.json())
        .then((result) => {
          this.setState({
            isLoaded: true,
            items: result.results,
          });
        });
    } else if (this.itemName && this.itemName.trim() == '') {
      fetch(`https://swapi.dev/api/people/?page=1`)
        .then((res) => res.json())
        .then((result) => {
          this.setState({
            isLoaded: true,
            items: result.results,
          });
        });
    } else if (this.itemName) {
      fetch(`https://swapi.dev/api/people/?page=1&name=${this.itemName}`)
        .then((res) => res.json())
        .then((result) => {
          this.setState({
            isLoaded: true,
            items: result.results,
          });
        });
    }
  }

  render() {
    const items = this.state.items;
    const loading = this.state.isLoaded;
    if (!loading) {
      return <Loader />;
    } else if (items) {
      return (
        <main>
          {items.map((el: Item) => (
            <PeopleItem
              key={el.id}
              name={el.name}
              height={el.height}
              hair_color={el.hair_color}
              skin_color={el.skin_color}
              gender={el.gender}
            />
          ))}
        </main>
      );
    } else {
      return <div className={classes.main__nothingfound}>Nothind found</div>;
    }
  }
}
export default MainPage;
