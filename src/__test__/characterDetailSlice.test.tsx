import 'whatwg-fetch';
import characterDetailReducer, {
  setIsClosed,
  setCharacterData,
} from '../store/reducers/characterDetailSlice';

describe('Test characterDetailSlice', () => {
  const initialState = {
    isClosed: true,
    characterId: 0,
    characterData: { id: 0 },
  };

  it('Check setIsClosed', () => {
    const action = setIsClosed({ isClosed: false, characterId: 1 });
    const expectedState = {
      isClosed: false,
      characterId: 1,
      characterData: { id: 0 },
    };
    const result = characterDetailReducer(initialState, action);
    expect(result).toEqual(expectedState);
  });

  it('Check setCharacterData', () => {
    const newCharacterData = { id: 1, name: 'Rick' };
    const action = setCharacterData(newCharacterData);
    const expectedState = {
      isClosed: true,
      characterId: 0,
      characterData: newCharacterData,
    };
    const result = characterDetailReducer(initialState, action);
    expect(result).toEqual(expectedState);
  });
});
