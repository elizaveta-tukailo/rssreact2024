import reducer, { setCurrentPage } from '../store/reducers/currentPageSlice';

describe('Testing currentPageSlice reducer', () => {
  const initialState = {
    page: 1,
  };
  test('Should handle setCurrentPage', () => {
    const nextState = reducer(initialState, setCurrentPage(5));
    expect(nextState.page).toEqual(5);
  });

  test('Should handle setCurrentPage with a negative value', () => {
    const nextState = reducer(initialState, setCurrentPage(-2));
    expect(nextState.page).toEqual(-2);
  });

  test('Should handle setCurrentPage with zero', () => {
    const nextState = reducer(initialState, setCurrentPage(0));
    expect(nextState.page).toEqual(0);
  });
});
