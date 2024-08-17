import { createSlice } from '@reduxjs/toolkit';
import { countriesList } from './../../utils/countriesList';

interface Countries {
  countries: string[];
}

const initialState: Countries = {
  countries: countriesList,
};

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
});

export default countriesSlice.reducer;
