import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ICard from '../../interfaces/ICard';
import styles from './card.module.css';
import Loader from '../Loader';
import { BASE_URL } from '../../common/constants';
import { useDispatch } from 'react-redux';
import {
  setCharacterData,
  setIsClosed,
} from '../../store/reducers/characterDetailSlice';
import { useTheme } from '../../context/ThemeContext';

const Card = () => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const { peopleId } = useParams();
  const [card, setCard] = useState<ICard | null>(null);
  const clickCloseModal = () => {
    dispatch(setIsClosed({ isClosed: true, characterId: 0 }));
    dispatch(setCharacterData([]));
  };
  const cardInfo = {
    item: card,
    isLoaded: false,
  };
  const [stateCard, setStateCard] = useState(cardInfo);
  useEffect(() => {
    fetch(`${BASE_URL}/${peopleId}`)
      .then((res) => res.json())
      .then((result) => {
        setCard(result);
        setStateCard({
          isLoaded: true,
          item: result,
        });
      });
  }, [peopleId]);

  if (stateCard) {
    const isLoaded = stateCard.isLoaded;
    if (!isLoaded) {
      return <Loader />;
    } else if (card && card.location) {
      return (
        <div className={`${styles['cardItemWrap']} ${styles[theme]}`}>
          <div className={styles['cardItem']}>
            <div className={styles['cardItemId']}>Card ID: {card.id}</div>
            <h3 className={styles['cardItemTitle']}> {card.name} </h3>
            <button
              className={styles['cardItemBtn']}
              onClick={clickCloseModal}
            ></button>
          </div>
          <div className={styles['cardItemRow']}>
            <div className={styles['cardItemImage']}>
              <img src={card.image}></img>
            </div>
            <div className={styles['cardItemInfo']}>
              <div className={styles['cardItemInfoItem']}>
                <span>Species:</span> {card.species}
              </div>
              <div className={styles['cardItemInfoItem']}>
                <span>Status:</span> {card.status}
              </div>
              <div className={styles['cardItemInfoItem']}>
                <span> Gender:</span> {card.gender}
              </div>
              <div className={styles['cardItemInfoItem']}>
                <span>Planet:</span> {card.location.name}
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
};
export default Card;
