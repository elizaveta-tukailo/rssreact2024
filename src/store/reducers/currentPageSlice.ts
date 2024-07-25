import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PageState {
  page: number;
}

const initialState: PageState = {
  page: 1,
};

const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
});

export const { setCurrentPage } = pageSlice.actions;
export default pageSlice.reducer;
