import styles from './card.module.css';
import Loader from '../Loader';
import { useDispatch } from 'react-redux';
import {
  setCharacterData,
  setIsClosed,
} from '../../store/reducers/characterDetailSlice';
import { useTheme } from '../../context/ThemeContext';
import { useGetCharacterQuery } from '../../services/character';
import { useEffect } from 'react';
import { setPageCharacters } from '../../store/reducers/pageCharactersSlice';
import { useRouter } from 'next/router';

const Card = () => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const router = useRouter();
  const { details } = router.query;
  const {
    data: character,
    error,
    isFetching,
  } = useGetCharacterQuery(Number(details));

  useEffect(() => {
    if (character) {
      dispatch(setPageCharacters(character));
      dispatch(setIsClosed({ isClosed: false, characterId: character.id }));
    }
  }, [dispatch, character]);

  const clickCloseModal = () => {
    dispatch(setIsClosed({ isClosed: true, characterId: 0 }));
    dispatch(setCharacterData([]));
  };

  if (!character) {
    return <div>No data found!</div>;
  }
  return (
    <>
      {isFetching ? (
        <div data-testid="loader">
          <Loader />
        </div>
      ) : null}
      {!error ? (
        <>
          <div
            className={`${styles['cardItemWrap']} ${styles[theme]}`}
            data-testid="detail-card"
          >
            <div className={styles['cardItem']}>
              <div className={styles['cardItemId']}>
                Card ID: {character.id}
              </div>
              <h3 className={styles['cardItemTitle']}> {character.name} </h3>
              <button
                className={styles['cardItemBtn']}
                onClick={clickCloseModal}
              ></button>
            </div>
            <div className={styles['cardItemRow']}>
              <div className={styles['cardItemImage']}>
                <img src={character.image}></img>
              </div>
              <div className={styles['cardItemInfo']}>
                <div className={styles['cardItemInfoItem']}>
                  <span>Species:</span> {character.species}
                </div>
                <div className={styles['cardItemInfoItem']}>
                  <span>Status:</span> {character.status}
                </div>
                <div className={styles['cardItemInfoItem']}>
                  <span> Gender:</span> {character.gender}
                </div>
                <div className={styles['cardItemInfoItem']}>
                  <span>Planet:</span> {character.location.name}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className={styles.error}>Error</div>
      )}
    </>
  );
};
export default Card;
