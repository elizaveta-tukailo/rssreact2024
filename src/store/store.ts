import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { characterApi } from './../services/character';
import selectedCharactersReducer from './reducers/selectedCharacters';
import currentPageReducer from './reducers/currentPageSlice';

export const store = configureStore({
  reducer: {
    [characterApi.reducerPath]: characterApi.reducer,
    selectedCharacters: selectedCharactersReducer,
    page: currentPageReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(characterApi.middleware),
});

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
