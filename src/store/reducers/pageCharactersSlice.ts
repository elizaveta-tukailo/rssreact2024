import { createSlice } from '@reduxjs/toolkit';

const pageCharactersSlice = createSlice({
  name: 'pageCharacters',
  initialState: {
    pageCharacters: {
      info: {
        count: 0,
        pages: 0,
        next: '',
        prev: '',
      },
      results: [],
    },
  },
  reducers: {
    setPageCharacters(state, action) {
      state.pageCharacters = action.payload;
    },
  },
});

export const { setPageCharacters } = pageCharactersSlice.actions;
export default pageCharactersSlice.reducer;
