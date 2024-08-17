import { configureStore } from '@reduxjs/toolkit';
import { countriesReducer } from './slices/countriesSlice';
import { formsDataReducer } from './slices/formsDataSliceSlice';

export const store = configureStore({
  reducer: {
    countries: countriesReducer,
    formsData: formsDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
