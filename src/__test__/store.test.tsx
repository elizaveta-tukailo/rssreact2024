import { setupStore } from '../store/store';
import { characterApi } from '../services/character';

describe('Test Redux Store', () => {
  it('Check if store creates with the correct reducers and middleware', () => {
    const store = setupStore();

    const rootReducer = store.getState();
    expect(rootReducer).toHaveProperty(characterApi.reducerPath);
    expect(rootReducer).toHaveProperty('selectedCharacters');
  });

  it('Check if dispatch actions correctly', () => {
    const store = setupStore();

    const action = { type: 'test/action' };
    store.dispatch(action);

    const state = store.getState();
    expect(state).toBeDefined();
  });
});
