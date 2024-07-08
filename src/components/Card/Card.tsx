import ICard from '../../interfaces/ICard';
import styles from './card.module.css';

interface CardProps {
  card: ICard | null;
}

export default function Card({ card }: CardProps) {
  return (
    <div className={styles.people__item}>
      <div className={styles.item__name}>{card?.name}</div>
      <div className={styles.item__info}>
        <div>Height: {card?.height}</div>
        <div>Hair color: {card?.hair_color}</div>
        <div>Skin color: {card?.skin_color}</div>
        <div>Gender: {card?.gender} </div>
      </div>
    </div>
  );
}
