import { useTheme } from '../../context/ThemeContext';
import { useSelector } from 'react-redux';
import IStore from '../../interfaces/IStore';

const SelectedCards = () => {
  const selectedData = useSelector(
    (state: IStore) => state.selectedCharacters.selectedCharacters
  );
  const { theme } = useTheme();

  const handleUnselectCards = () => {};
  const handleDownloadFile = () => {};
  return (
    <div className={`selected-items selected-items__${theme}`}>
      <div className={`selected-items__inner`}>
        <div className={`selected-items__count`}>
          Quantity of selected items: <span>{selectedData.length}</span>
        </div>
        <div className={`selected-items__buttons`}>
          <button
            className={`selected-items__button`}
            onClick={handleUnselectCards}
          >
            Unselected all
          </button>
          <a
            href=""
            className={`selected-items__button`}
            onClick={handleDownloadFile}
          >
            Download
          </a>
        </div>
      </div>
    </div>
  );
};
export default SelectedCards;
