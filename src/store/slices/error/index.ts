import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ErrorSlice } from './types';
import { IBaseError } from '../../../types/error';

export const initialState: ErrorSlice = {
  errorList: [],
};

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    resetError(state) {
      state.errorList = [];
    },
    updateError: (state, action: PayloadAction<IBaseError[]>) => {
      state.errorList = action.payload;
    },
  },
});

export const { updateError, resetError } = errorSlice.actions;
export const errorReducer = errorSlice.reducer;
