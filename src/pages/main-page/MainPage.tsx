import { NavLink, Outlet, useParams } from 'react-router-dom';
import styles from './main-page.module.css';
import ICard from '../../interfaces/ICard';
import Loader from '../../components/Loader';
import Search from '../../components/Search';
import ErrorButton from '../../components/ErrorBoundary/Button';
import Pagination from '../../components/Pagination';

import { useDispatch, useSelector } from 'react-redux';
import { useGetCharactersQuery } from '../../services/character';
import IStore from '../../interfaces/IStore';
import { setCurrentPage } from '../../store/reducers/currentPageSlice';
import { setPageCharacters } from '../../store/reducers/pageCharactersSlice';
import {
  setCharacterData,
  setIsClosed,
} from '../../store/reducers/characterDetailSlice';
import { ChangeEvent, useEffect, useMemo } from 'react';
import { toggleCharacter } from '../../store/reducers/selectedCharactersSlice';
import SelectedCards from '../../components/SelectedCards';
import { useTheme } from '../../context/ThemeContext';

const MainPage: React.FC = () => {
  let selectedItems: number[] = [];
  const { theme } = useTheme();
  const { id } = useParams();
  const dispatch = useDispatch();
  const page = useSelector((state: IStore) => state.currentPage.page);
  const characterDetail = useSelector((state: IStore) => state.characterDetail);
  const selectedCharacters = useSelector(
    (state: IStore) => state.selectedCharacters
  );

  const search = localStorage.getItem('searchQuery') || '';
  const {
    data = { results: [], info: { count: 0 } },
    isFetching,
    error,
  } = useGetCharactersQuery({
    page,
    search,
  });

  const cards = data.results || [];

  useEffect(() => {
    dispatch(setCurrentPage(Number(id) || 1));
  }, [dispatch, id]);

  useEffect(() => {
    if (data) {
      dispatch(setPageCharacters(data));
    }
  }, [dispatch, data]);

  const closeCardDetail = (event: React.MouseEvent<HTMLDivElement>) => {
    if (
      !characterDetail.isClosed &&
      (event.target as HTMLElement).id == 'people-items'
    ) {
      dispatch(setIsClosed({ isClosed: true, characterId: 0 }));
      dispatch(setCharacterData([]));
    }
  };

  const handleCardClick = (event: React.MouseEvent) => {
    const id = event.currentTarget.id;
    dispatch(
      setIsClosed({
        isClosed: false,
        characterId: id,
      })
    );
    const cardData = cards.find((card) => card.id === Number(id));
    dispatch(setCharacterData(cardData));
  };

  const handleCardCheckboxChange = (event: ChangeEvent) => {
    event.stopPropagation();
    const currentItem = data.results.find(
      (item) => item.id === Number((event.target as HTMLInputElement).name)
    );
    dispatch(toggleCharacter(currentItem));
  };

  selectedItems = useMemo(() => {
    return data.results
      .filter((result) =>
        selectedCharacters.selectedCharacters.includes(result)
      )
      .map((result) => result.id);
  }, [data.results, selectedCharacters.selectedCharacters]);

  const cardsBlock = (
    <div className={styles['mainPeopleWrap']}>
      <div
        className={`${styles['mainPeopleItems']} ${styles[theme]}`}
        onClick={(e) => closeCardDetail(e)}
        id="people-items"
      >
        {cards.map((item: ICard) => {
          return (
            <div className={`${styles['mainPeopleItemWrap']}`} key={item.id}>
              <input
                className={styles['mainPeopleItemCheckbox']}
                type="checkbox"
                name={item.id.toString()}
                checked={selectedItems.includes(item.id)}
                onChange={handleCardCheckboxChange}
              />
              <NavLink
                to={`details/${item.id}`}
                id={String(item.id)}
                onClick={handleCardClick}
              >
                <div className={styles['mainPeopleItem']}>
                  <div
                    className={
                      characterDetail.isClosed === false
                        ? `${styles['mainPeopleItemImage']} ${styles['mainPeopleItemImageDisabled']}`
                        : `${styles['mainPeopleItemImage']}`
                    }
                  >
                    <img
                      className={styles.itemimg}
                      src={item.image}
                      alt={item.name}
                      id="activeCard"
                    />
                  </div>
                </div>
                <div className={styles['mainPeopleItemInfo']}>
                  <h3 className={styles['mainPeopleItemTitle']}>{item.name}</h3>
                  {item.gender && (
                    <div className={styles['infoItem']}>{item.gender}</div>
                  )}
                </div>
              </NavLink>
            </div>
          );
        })}
        {!(cards.length > 0) && <div>No characters</div>}
      </div>
    </div>
  );

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
      {!error ? (
        <>
          <div className={setCardRowStyle()}>
            <div className={styles['mainPeopleLeft']}>{cardsBlock}</div>
            <div className={styles['mainPeopleRight']}>
              <div className={setCardRightStyle()}>
                <Outlet />
              </div>
            </div>
          </div>
          <Pagination totalCount={data.info.count} currentPage={page} />
          {Boolean(selectedCharacters.selectedCharacters.length > 0) ? (
            <SelectedCards />
          ) : null}
        </>
      ) : null}
      {error ? <div className={styles.error}>Error</div> : null}
    </>
  );
};

export default MainPage;
