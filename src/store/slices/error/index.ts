import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ErrorSlice } from './types';
import { IBaseError } from '../../../types/error';
import { handleChangePassword, handleChangeUserInfo } from '../user/thunk';

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
  extraReducers: builder => {
    // change password
    builder.addCase(handleChangePassword.rejected, (state, action) => {
      state.errorList = action.payload || [];
    });

    // change password
    builder.addCase(handleChangeUserInfo.rejected, (state, action) => {
      state.errorList = action.payload || [];
    });
  },
});

export const { updateError, resetError } = errorSlice.actions;
export const errorReducer = errorSlice.reducer;
