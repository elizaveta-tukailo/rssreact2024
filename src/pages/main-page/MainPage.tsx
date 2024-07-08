import { Component } from 'react';
import Loader from '../../components/Loader';
import styles from './main-page.module.css';
import Card from '../../components/Card';
import Search from '../../components/Search';
import ErrorButton from '../../components/ErrorBoundary/Button';

type CardItem = {
  name: string;
  height: number;
  hair_color: string;
  skin_color: string;
  gender: string;
};

class MainPage extends Component<
  Record<string, never>,
  {
    searchQuery: string;
    cards: JSX.Element | JSX.Element[] | null;
    isLoaded: boolean;
    error: null;
  }
> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      searchQuery: localStorage.getItem('searchQuery') || '',
      cards: null,
      isLoaded: false,
      error: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.renderCards = this.renderCards.bind(this);
    this.updateCards = this.updateCards.bind(this);
  }

  componentDidMount() {
    this.updateCards();
  }

  handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const searchQuery = e.target.value;
    this.setState({ searchQuery });
    this.updateCards();
  }

  renderCards(cardsValues: Array<CardItem>) {
    const loading = this.state.isLoaded;
    if (!loading) {
      return <Loader />;
    } else if (cardsValues.length > 0) {
      const cards = cardsValues.map((item: CardItem) => (
        <Card
          name={item.name}
          height={item.height}
          hair_color={item.hair_color}
          skin_color={item.skin_color}
          gender={item.gender}
          key={item.name}
        />
      ));
      return <div className={styles.people__items}>{cards}</div>;
    } else {
      return <div className={styles.people__nothingfound}>No items found</div>;
    }
  }

  updateCards() {
    let searchQueryString = '';
    this.state.searchQuery
      ? (searchQueryString = `&search=${this.state.searchQuery}`)
      : (searchQueryString = '');
    fetch(`https://swapi.dev/api/people/?page=1${searchQueryString}`)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            cards: this.renderCards(result.results),
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  render() {
    return (
      <div className="container">
        <div className={styles.search__wrapper}>
          <ErrorButton />
          <Search />
        </div>
        {this.state.cards}
      </div>
    );
  }
}
export default MainPage;
