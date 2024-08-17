import { createSlice } from '@reduxjs/toolkit';
import { countriesList } from './../../utils/countriesList';

type Countries = {
  countries: string[];
};

const initialState: Countries = {
  countries: countriesList,
};

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
});

export const countriesReducer = countriesSlice.reducer;
