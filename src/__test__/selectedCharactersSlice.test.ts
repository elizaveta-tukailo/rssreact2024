import reducer, {
  toggleCharacter,
  unselectAll,
} from '../store/reducers/selectedCharactersSlice';
import ICard from '../interfaces/ICard';
import { character } from './__mocks__/charactersMockData';
import 'whatwg-fetch';

describe('selectedCharactersSlice', () => {
  const initialState = {
    selectedCharacters: [],
  };

  it('Check toggleCharacter by adding a characte', () => {
    const characterData: ICard = character;
    const action = toggleCharacter(characterData);
    const newState = reducer(initialState, action);

    expect(newState.selectedCharacters).toEqual([characterData]);
  });

  it('Check toggleCharacter by removing a character', () => {
    const characterData: ICard = character;
    const initialStateWithCharacter = {
      selectedCharacters: [characterData],
    };

    const action = toggleCharacter(characterData);
    const newState = reducer(initialStateWithCharacter, action);

    expect(newState.selectedCharacters).toEqual([]);
  });

  it('Check unselectAll', () => {
    const character1: ICard = character;
    const character2: ICard = {
      id: 2,
      name: 'Character 2',
      image: 'https://example.com',
      species: '',
      type: 'unknown',
      gender: 'male',
    };
    const initialStateWithCharacters = {
      selectedCharacters: [character1, character2],
    };

    const action = unselectAll();
    const newState = reducer(initialStateWithCharacters, action);

    expect(newState.selectedCharacters).toEqual([]);
  });
});
