import { useTheme } from '../../context/ThemeContext';
import { useDispatch, useSelector } from 'react-redux';
import IStore from '../../interfaces/IStore';
import styles from './selected-cards.module.css';
import { unselectAll } from '../../store/reducers/selectedCharactersSlice';
import { toCapitalize } from '../../utils/toCapitalize';

const SelectedCards = () => {
  const fileData = ['id;name;status;type;gender', '\n'];
  const dispatch = useDispatch();
  const selectedCharacters = useSelector(
    (state: IStore) => state.selectedCharacters.selectedCharacters
  );
  const { theme } = useTheme();

  const handleUnselectCards = () => {
    dispatch(unselectAll());
  };

  selectedCharacters.forEach((character) => {
    const charactersData = [
      `${character.id}`,
      `${character.name}` ? `${character.name}` : '-',
      `${character.status}` ? `${character.status}` : '-',
      `${character.type}` ? `${character.type}` : '-',
      `${character.gender}` ? `${character.gender}` : '-',
    ];
    fileData.push(charactersData.join(';'), '\n');
  });

  const blob = new Blob([...fileData], { type: 'text/csv;charset=utf-8' });

  return (
    <div
      className={`${styles.selectedItems} ${styles[`selectedItems${toCapitalize(theme)}`]}`}
    >
      <div className={styles.selectedItemsInner}>
        <div className={styles.selectedItemsCount}>
          Quantity of selected items: <span>{selectedCharacters.length}</span>
        </div>
        <div className={styles.selectedItemsButtons}>
          <button
            className={styles.selectedItemsButton}
            onClick={handleUnselectCards}
          >
            Unselect all
          </button>
          <a
            href={window.URL.createObjectURL(blob)}
            className={styles.selectedItemsButton}
            download={`${selectedCharacters.length}_characters`}
          >
            Download
          </a>
        </div>
      </div>
    </div>
  );
};
export default SelectedCards;
