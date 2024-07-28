import { characterApi } from '../services/character';
import { configureStore } from '@reduxjs/toolkit';

const api = characterApi;

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(api.middleware);
  },
});

describe('characterApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches characters successfully', async () => {
    const result = await store.dispatch(
      api.endpoints.getCharacters.initiate({ page: 1 })
    );

    expect(result).toBeDefined();
    expect(result.data).toBeDefined();
    expect(Array.isArray(result.data?.results)).toBe(true);
  });

  it('fetches a single character successfully', async () => {
    const characterId = 1;
    const result = await store.dispatch(
      api.endpoints.getCharacter.initiate(characterId)
    );

    expect(result).toBeDefined();
    expect(result.data).toBeDefined();
    expect(result.data.id).toBe(characterId);
  });
});
