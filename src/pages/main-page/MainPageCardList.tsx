import ICard from '../../interfaces/ICard';
import MainPageCard from './MainPageCard';

type Card = {
  cards: ICard[];
};

const CardList = (props: Card) => {
  const cards = props.cards;
  if (cards.length > 0) {
    return (
      <>
        {cards.map((item: ICard) => {
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
              location={item.location}
            />
          );
        })}
      </>
    );
  } else {
    return <div> {'Nothing found'} </div>;
  }
};

export default CardList;
