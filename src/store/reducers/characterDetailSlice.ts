import { createSlice } from '@reduxjs/toolkit';

const characterDetailSlice = createSlice({
  name: 'characterDetail',
  initialState: {
    isClosed: false,
    characterId: 0,
    characterData: { id: 0 },
  },
  reducers: {
    setIsClosed(state, action) {
      state.isClosed = action.payload.isClosed;
      state.characterId = action.payload.characterId || 0;
    },
    setCharacterData(state, action) {
      state.characterData = action.payload.characterData;
    },
  },
});

export const { setIsClosed, setCharacterData } = characterDetailSlice.actions;
export default characterDetailSlice.reducer;
