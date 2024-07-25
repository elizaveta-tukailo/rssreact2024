import ICard from './ICard';

interface IStore {
  selectedCharacters: {
    selectedCharacters: ICard[];
  };
  characterDetail: {
    isClosed: boolean;
    characterId: number;
    characterData: ICard;
  };
  pageCharacters: {
    pageCharacters: {
      info: {
        count: number;
        pages: number;
        next: string;
        prev: string;
      };
      results: ICard[];
    };
  };
  currentPage: {
    page: number;
  };
}
export default IStore;
