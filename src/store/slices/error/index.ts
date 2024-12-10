import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ErrorSlice } from './types';
import {
  handleLogin,
  handleRegister,
  handleSendOtp,
  handleVerifyOtp,
} from '../auth/thunk';
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
    // login
    builder.addCase(handleLogin.rejected, (state, action) => {
      state.errorList = action.payload || [];
    });

    // register
    builder.addCase(handleRegister.rejected, (state, action) => {
      state.errorList = action.payload || [];
    });

    // change password
    builder.addCase(handleChangePassword.rejected, (state, action) => {
      state.errorList = action.payload || [];
    });

    // change password
    builder.addCase(handleChangeUserInfo.rejected, (state, action) => {
      state.errorList = action.payload || [];
    });

    // send otp
    builder.addCase(handleSendOtp.rejected, (state, action) => {
      state.errorList = action.payload || [];
    });

    // verify otp
    builder.addCase(handleVerifyOtp.rejected, (state, action) => {
      state.errorList = action.payload || [];
    });
  },
});

export const { updateError, resetError } = errorSlice.actions;
export const errorReducer = errorSlice.reducer;
