import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ICard from '../../interfaces/ICard';
import styles from './card.module.css';
import Loader from '../Loader';
import { BASE_URL } from '../../common/constants';

const Card = () => {
  const { peopleId } = useParams();
  const [card, setCard] = useState<ICard | null>(null);
  const navigate = useNavigate();
  const clickCloseModal = () => {
    navigate(-1);
    localStorage.setItem('active', '');
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
        <div className={styles['card__item-wrap']}>
          <div className={styles['card__item']}>
            <div className={styles['card__item-id']}>Card ID: {card.id}</div>
            <h3 className={styles['card__item-title']}> {card.name} </h3>
            <button
              className={styles['card__item-btn']}
              onClick={clickCloseModal}
            ></button>
          </div>
          <div className={styles['card__item-row']}>
            <div className={styles['card__item-image']}>
              <img src={card.image}></img>
            </div>
            <div className={styles['card__item-info']}>
              <div className={styles['card__item-info-item']}>
                <span>Species:</span> {card.species}
              </div>
              <div className={styles['card__item-info-item']}>
                <span>Status:</span> {card.status}
              </div>
              <div className={styles['card__item-info-item']}>
                <span> Gender:</span> {card.gender}
              </div>
              <div className={styles['card__item-info-item']}>
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
