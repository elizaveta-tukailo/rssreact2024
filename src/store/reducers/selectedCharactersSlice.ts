import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ICard from '../../interfaces/ICard';

interface SelectedCharactersState {
  selectedCharacters: ICard[];
}

const initialState: SelectedCharactersState = {
  selectedCharacters: [],
};

const selectedCharactersSlice = createSlice({
  name: 'selectedCharacters',
  initialState,
  reducers: {
    toggleCharacter: (state, action: PayloadAction<ICard>) => {
      const character = action.payload;
      const existingIndex = state.selectedCharacters.findIndex(
        (i) => i.id === character.id
      );
      if (existingIndex >= 0) {
        state.selectedCharacters.splice(existingIndex, 1);
      } else {
        state.selectedCharacters.push(character);
      }
    },
    unselectAll: (state) => {
      state.selectedCharacters = [];
    },
  },
});

export const { toggleCharacter, unselectAll } = selectedCharactersSlice.actions;
export default selectedCharactersSlice.reducer;
