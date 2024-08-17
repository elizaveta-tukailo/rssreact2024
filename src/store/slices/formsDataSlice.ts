import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import FormFields from '../../interfaces/form';

interface FormFieldsState {
  formData: FormFields[];
}

const initialState: FormFieldsState = {
  formData: [],
};

const formsDataSlice = createSlice({
  name: 'formsData',
  initialState,
  reducers: {
    setData(state, action: PayloadAction<FormFields>) {
      state.formData.push(action.payload);
    },
  },
});

export const { setData } = formsDataSlice.actions;
export const formsDataReducer = formsDataSlice.reducer;
