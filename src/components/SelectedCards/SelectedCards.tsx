import { useTheme } from '../../context/ThemeContext';
import { useDispatch, useSelector } from 'react-redux';
import IStore from '../../interfaces/IStore';
import './selected-cards.css';
import { unselectAll } from '../../store/reducers/selectedCharactersSlice';

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
    <div className={`selected-items selected-items--${theme}`}>
      <div className={`selected-items__inner`}>
        <div className={`selected-items__count`}>
          Quantity of selected items: <span>{selectedCharacters.length}</span>
        </div>
        <div className={`selected-items__buttons`}>
          <button
            className={`selected-items__button`}
            onClick={handleUnselectCards}
          >
            Unselected all
          </button>
          <a
            href={window.URL.createObjectURL(blob)}
            className={`selected-items__button`}
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
