import { useCallback, useEffect, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { BASE_URL } from '../../common/constants';
import styles from './main-page.module.css';
import ICard from '../../interfaces/ICard';
import Loader from '../../components/Loader';
import Search from '../../components/Search';
import ErrorButton from '../../components/ErrorBoundary/Button';
import Pagination from '../../components/Pagination';
import MainPageCard from './MainPageCard';

const MainPage: React.FC = () => {
  const searchQuery = localStorage.getItem('searchQuery');
  const [cards, setCards] = useState<ICard[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [error, setIsErrorOccured] = useState<boolean>(false);
  const { id } = useParams();
  const activeStyle = localStorage.getItem('active');
  const navigate = useNavigate();

  const updateCards = useCallback(() => {
    let pageParams = id ? `?page=${id}` : '?page=1';
    let searchName = '';
    if (searchQuery) {
      pageParams = '';
      searchName = `?name=${searchQuery.toLocaleLowerCase()}`;
    }

    fetch(`${BASE_URL}/${pageParams}${searchName}`)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.results) {
            setIsLoaded(true);
            setCards(() => result.results);
            setIsErrorOccured(() => false);
          } else {
            setIsLoaded(true);
            setCards(() => []);
            setIsErrorOccured(() => true);
          }
        },
        () => {
          setIsLoaded(true);
          setCards(() => []);
          setIsErrorOccured(() => true);
        }
      );
  }, [searchQuery, id]);

  useEffect(() => {
    updateCards();
  }, [updateCards]);

  const closeModalWindow = () => {
    if (activeStyle === 'activeCard') {
      localStorage.setItem('active', '');
      navigate(-1);
    }
  };

  const cardsBlock = (
    <div className={styles['main-people__wrap']}>
      <div className={styles['main-people__items']} onClick={closeModalWindow}>
        {cards.map((item) => {
          return (
            <MainPageCard
              key={item.id}
              id={item.id}
              name={item.name}
              image={item.image}
              status={item.status}
              species={item.species}
              type={item.type}
              gender={item.gender}
              planet={item.planet}
              created={item.created}
              location={item.location}
            />
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      <div className={styles['search__wrapper']}>
        <Search />
        <ErrorButton />
      </div>
      {!isLoaded && <Loader />}
      {!error && (
        <>
          <div
            className={
              activeStyle === 'activeCard'
                ? `${styles['main-people__row']} ${styles['main-people__row--active']}`
                : `${styles['main-people__row']}`
            }
          >
            <div className={styles['main-people__left']}>{cardsBlock}</div>
            <div className={styles['main-people__right']}>
              <div
                className={
                  activeStyle === 'activeCard'
                    ? `${styles['main-people__right-inner']} ${styles['main-people__inner--active']}`
                    : `${styles['main-people__right-inner']}`
                }
              >
                <Outlet />
              </div>
            </div>
          </div>
          <Pagination />
        </>
      )}
      {error && <div className={styles.error}>Nothing found</div>}
    </>
  );
};

export default MainPage;
