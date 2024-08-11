import Card from '../components/Card/Card';
import CardsList from '../components/CardsList/CardsList';
import Pagination from '../components/Pagination/Pagination';
import Search from '../components/Search/Search';
import SelectedCards from '../components/SelectedCards/SelectedCards';
import styles from '../styles/main-page.module.css';

async function getCharacter(searchQuery: string = '', page: string = '1') {
  let searchRow = '';
  const params = [];
  if (searchQuery) {
    params.push(`name=${encodeURIComponent(searchQuery)}`);
  }
  if (page != undefined) {
    params.push(`page=${page}`);
  }
  if (params.length > 0) {
    searchRow = '?' + params.join('&');
  }
  const response = await fetch(
    `https://rickandmortyapi.com/api/character/${searchRow}`,
    {
      method: 'GET',
    }
  );

  const people = await response.json();
  return people;
}

const Home = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  const { details, page = 1, search } = searchParams;

  const data = await getCharacter(search, String(page));
  const totalCharactersCount = data.info.count;

  const setCardRowStyle = (): string => {
    return Boolean(details) === true
      ? `${styles['mainPeopleRow']} ${styles['mainPeopleRowActive']}`
      : `${styles['mainPeopleRow']}`;
  };
  const setCardRightStyle = () => {
    return Boolean(details) === true
      ? `${styles['mainPeopleRightInner']} ${styles['mainPeopleInnerActive']}`
      : `${styles['mainPeopleRightInner']}`;
  };

  return (
    <div className="container">
      <div className={`${styles['searchWrapper']} `}>
        <Search />
      </div>
      <div className={setCardRowStyle()}>
        <div className={styles['mainPeopleLeft']}>
          <CardsList cards={data.results} />
        </div>
        <div className={styles['mainPeopleRight']}>
          <div className={setCardRightStyle()}>
            {Boolean(details) ? <Card id={details} /> : null}
          </div>
        </div>
      </div>
      <Pagination
        totalCount={totalCharactersCount}
        currentPage={Number(page)}
      />
      <SelectedCards />
    </div>
  );
};

export default Home;
