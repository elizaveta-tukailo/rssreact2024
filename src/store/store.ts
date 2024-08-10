import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { characterApi } from './../services/character';
import selectedCharactersReducer from './reducers/selectedCharactersSlice';
import characterDetailReducer from './reducers/characterDetailSlice';
import pageCharactersReducer from './reducers/pageCharactersSlice';
import currentPageReducer from './reducers/currentPageSlice';
import { createWrapper } from 'next-redux-wrapper';

const rootReducer = combineReducers({
  [characterApi.reducerPath]: characterApi.reducer,
  selectedCharacters: selectedCharactersReducer,
  characterDetail: characterDetailReducer,
  pageCharacters: pageCharactersReducer,
  currentPage: currentPageReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(characterApi.middleware),
  });
};

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
export type RootState = ReturnType<AppStore['getState']>;
export const wrapper = createWrapper(setupStore);
export default setupStore;
