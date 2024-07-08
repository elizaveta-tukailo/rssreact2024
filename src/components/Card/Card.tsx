import styles from './Card.module.css';

interface CardProps {
  name: string;
  height: number;
  hair_color: string;
  skin_color: string;
  gender: string;
}

export default function Card({
  name,
  height,
  hair_color,
  skin_color,
  gender,
}: CardProps) {
  return (
    <div className={styles.people__item}>
      <div className={styles.item__name}>{name}</div>
      <div className={styles.item__info}>
        <div>Height: {height}</div>
        <div>Hair color: {hair_color}</div>
        <div>Skin color: {skin_color}</div>
        <div>Gender: {gender} </div>
      </div>
    </div>
  );
}
