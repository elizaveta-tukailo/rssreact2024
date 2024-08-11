import styles from './card.module.css';
import ICard from '@/src/interfaces/ICard';
import CloseCard from '../CloseCard/CloseCard';

interface CardProp {
  id: string;
}

async function getCharacter(id: string) {
  const characterResponse = await fetch(
    `https://rickandmortyapi.com/api/character/${id}`,
    {
      method: 'GET',
    }
  );
  const character: ICard = await characterResponse.json();
  return { character };
}

const Card = async (props: CardProp) => {
  const { id } = props || {};
  const { character } = await getCharacter(id);
  return (
    <>
      {character ? (
        <div className={`${styles['cardItemWrap']} `} data-testid="detail-card">
          <div className={styles['cardItem']}>
            <div className={styles['cardItemId']}>Card ID: {character.id}</div>
            <h3 className={styles['cardItemTitle']}> {character.name} </h3>
            <CloseCard />
          </div>
          <div className={styles['cardItemRow']}>
            <div className={styles['cardItemImage']}>
              <img src={character.image} alt={character.name} />
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
                <span>Planet:</span> {character.location?.name}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>No data found!</div>
      )}
    </>
  );
};
export default Card;
