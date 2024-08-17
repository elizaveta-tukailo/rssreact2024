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
    addData(state, action: PayloadAction<FormFields>) {
      //console.log(state);
      state.formData.push(action.payload);
    },
    getAllData(state) {
      console.log(state);
    },
  },
});

export const { addData, getAllData } = formsDataSlice.actions;
export default formsDataSlice.reducer;
