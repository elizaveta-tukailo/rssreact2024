import { combineReducers, configureStore } from '@reduxjs/toolkit';
import uncontrolledFormReducer from './slices/formsDataSlice.ts';

const rootReducer = combineReducers({
  uncontrolledForm: uncontrolledFormReducer,
});

export const store = configureStore({
  reducer: {
    reducer: rootReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
