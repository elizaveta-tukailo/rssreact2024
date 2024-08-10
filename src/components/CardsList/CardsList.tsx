import ICard from '@/src/interfaces/ICard';
import styles from './cards-list.module.css';
import { useTheme } from '@/src/context/ThemeContext';
import { useDispatch, useSelector } from 'react-redux';
import IStore from '@/src/interfaces/IStore';
import {
  setCharacterData,
  setIsClosed,
} from '@/src/store/reducers/characterDetailSlice';
import { ChangeEvent, useMemo } from 'react';
import { toggleCharacter } from '@/src/store/reducers/selectedCharactersSlice';
import { useRouter } from 'next/router';

interface CardsProps {
  cards: ICard[];
}

const CardsList: React.FC<CardsProps> = ({ cards }) => {
  const router = useRouter();
  let selectedItems: number[] = [];
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const characterDetail = useSelector((state: IStore) => state.characterDetail);
  const selectedCharacters = useSelector(
    (state: IStore) => state.selectedCharacters
  );
  const closeCardDetail = (event: React.MouseEvent<HTMLDivElement>) => {
    if (
      !characterDetail.isClosed &&
      (event.target as HTMLElement).id == 'people-items'
    ) {
      dispatch(setIsClosed({ isClosed: true, characterId: 0 }));
      dispatch(setCharacterData([]));
    }
  };

  selectedItems = useMemo(() => {
    return cards
      .filter((result) =>
        selectedCharacters.selectedCharacters.includes(result)
      )
      .map((result) => result.id);
  }, [cards, selectedCharacters.selectedCharacters]);

  const handleCardCheckboxChange = (event: ChangeEvent) => {
    event.stopPropagation();
    const currentItem = cards.find(
      (item) => item.id === Number((event.target as HTMLInputElement).name)
    );
    dispatch(toggleCharacter(currentItem));
  };

  const handleCardClick = (characterId: string) => {
    const newQuery = { ...router.query };
    newQuery.details = characterId;
    router.push({ pathname: router.pathname, query: newQuery });
    dispatch(
      setIsClosed({
        isClosed: false,
        characterId: characterId,
      })
    );
    const cardData = cards.find((card) => card.id === Number(characterId));
    dispatch(setCharacterData(cardData));
  };

  return (
    <div className={`${styles['mainPeopleWrap']}  `}>
      <div
        className={`${styles['mainPeopleItems']} ${styles[theme]}`}
        onClick={(e) => closeCardDetail(e)}
        id="people-items"
      >
        {cards.map((card: ICard) => {
          return (
            <div className={`${styles['mainPeopleItemWrap']}`} key={card.id}>
              <input
                className={styles['mainPeopleItemCheckbox']}
                type="checkbox"
                name={card.id.toString()}
                checked={selectedItems.includes(card.id)}
                onChange={handleCardCheckboxChange}
              />
              <div
                id={String(card.id)}
                onClick={() => handleCardClick(String(card.id))}
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
                      src={card.image}
                      alt={card.name}
                      id="activeCard"
                    />
                  </div>
                </div>
                <div className={styles['mainPeopleItemInfo']}>
                  <h3 className={styles['mainPeopleItemTitle']}>{card.name}</h3>
                  {card.gender && (
                    <div className={styles['infoItem']}>{card.gender}</div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        {!(cards.length > 0) && <div>No characters</div>}
      </div>
    </div>
  );
};
export default CardsList;
