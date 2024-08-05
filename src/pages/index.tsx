import styles from '../styles/main-page.module.css';
import Loader from '../components/Loader';
import Search from '../components/Search';
import ErrorButton from '../components/ErrorBoundary/Button';
import Pagination from '../components/Pagination';

import { useDispatch, useSelector } from 'react-redux';
import {
  characterApi,
  useGetCharactersQuery,
  getRunningQueriesThunk,
} from '../services/character';
import IStore from '../interfaces/IStore';
import { setCurrentPage } from '../store/reducers/currentPageSlice';
import { useEffect } from 'react';
import SelectedCards from '../components/SelectedCards';
import { useTheme } from '../context/ThemeContext';
import { wrapper } from '../store/store';
import { useRouter } from 'next/router';
import CardsList from '../components/CardsList';
import Card from '../components/Card';

const MainPage: React.FC = () => {
  const { theme } = useTheme();
  const router = useRouter();

  const { page = 1, search, details = '' } = router.query;
  const searchValue = Array.isArray(search) ? search[0] : search;
  const { data = { results: [], info: { count: 0 } }, isFetching } =
    useGetCharactersQuery({
      page: Number(page),
      search: searchValue,
    });
  const totalCharactersCount = data.info.count;

  const dispatch = useDispatch();
  const characterDetail = useSelector((state: IStore) => state.characterDetail);
  const selectedCharacters = useSelector(
    (state: IStore) => state.selectedCharacters
  );

  useEffect(() => {
    dispatch(setCurrentPage(Number(page) || 1));
  }, [dispatch, page]);

  const setCardRowStyle = (): string => {
    return characterDetail.isClosed === false
      ? `${styles['mainPeopleRow']} ${styles['mainPeopleRowActive']}`
      : `${styles['mainPeopleRow']}`;
  };
  const setCardRightStyle = () => {
    return characterDetail.isClosed === false
      ? `${styles['mainPeopleRightInner']} ${styles['mainPeopleInnerActive']}`
      : `${styles['mainPeopleRightInner']}`;
  };

  return (
    <>
      <div className={`${styles['searchWrapper']} ${styles[theme]}`}>
        <Search />
        <ErrorButton />
      </div>
      {isFetching ? <Loader /> : null}
      <div className={setCardRowStyle()}>
        <div className={styles['mainPeopleLeft']}>
          <CardsList cards={data.results} />
        </div>
        <div className={styles['mainPeopleRight']}>
          <div className={setCardRightStyle()}>
            <Card />
          </div>
        </div>
      </div>
      <Pagination
        totalCount={totalCharactersCount}
        currentPage={Number(page)}
      />
      {Boolean(selectedCharacters.selectedCharacters.length > 0) ? (
        <SelectedCards />
      ) : null}
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { page = 1, query = '', details } = context.query;
    await store.dispatch(
      characterApi.endpoints.getCharacters.initiate({
        search: query as string,
        page: +page,
      })
    );
    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: {},
    };
  }
);

export default MainPage;
