import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { characterApi } from '../services/character';
import selectedCharactersReducer from '../store/reducers/selectedCharactersSlice';
import characterDetailReducer from '../store/reducers/characterDetailSlice';
import pageCharactersReducer from '../store/reducers/pageCharactersSlice';
import currentPageReducer from '../store/reducers/currentPageSlice';
import { render, RenderOptions } from '@testing-library/react';
import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '../context/ThemeContext';

const rootReducer = combineReducers({
  [characterApi.reducerPath]: characterApi.reducer,
  selectedCharacters: selectedCharactersReducer,
  characterDetail: characterDetailReducer,
  pageCharacters: pageCharactersReducer,
  currentPage: currentPageReducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(characterApi.middleware),
    preloadedState,
  });
};

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
export type RootState = ReturnType<typeof rootReducer>;
export default setupStore;

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  extendedRenderOptions: ExtendedRenderOptions = {}
) {
  const {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  } = extendedRenderOptions;

  const Wrapper = ({ children }: PropsWithChildren) => (
    <Provider store={store}>
      <ThemeProvider>{children}</ThemeProvider>
    </Provider>
  );

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}
