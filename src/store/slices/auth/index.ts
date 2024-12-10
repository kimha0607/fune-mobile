import { createSlice } from '@reduxjs/toolkit';
import { AuthSlice } from './types';
import {
  handleLogin,
  handleRegister,
  handleSendOtp,
  handleVerifyOtp,
} from './thunk';

export const initialState: AuthSlice = {
  accessToken: '',
  loadingSignIn: 'idle',
  loadingRegister: 'idle',
  loadingSendOtp: 'idle',
  loadingVerifyOtp: 'idle',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    addAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    removeAccessToken: state => {
      state.accessToken = '';
    },
    resetLoadingAuth: state => {
      state.loadingSignIn = 'idle';
      state.loadingRegister = 'idle';
    },
    resetLoadingSendOtp: state => {
      state.loadingSendOtp = 'idle';
    },
    resetLoadingVerifyOtp: state => {
      state.loadingVerifyOtp = 'idle';
    },
  },
  extraReducers: builder => {
    // login
    builder.addCase(handleLogin.pending, state => {
      state.loadingSignIn = 'pending';
    });
    builder.addCase(handleLogin.fulfilled, (state, action) => {
      state.accessToken = action.payload.token;
      state.loadingSignIn = 'fulfilled';
    });
    builder.addCase(handleLogin.rejected, state => {
      state.loadingSignIn = 'rejected';
    });

    // register
    builder.addCase(handleRegister.pending, state => {
      state.loadingRegister = 'pending';
    });
    builder.addCase(handleRegister.fulfilled, state => {
      state.loadingRegister = 'fulfilled';
    });
    builder.addCase(handleRegister.rejected, state => {
      state.loadingRegister = 'rejected';
    });

    // send otp
    builder.addCase(handleSendOtp.pending, state => {
      state.loadingSendOtp = 'pending';
    });
    builder.addCase(handleSendOtp.fulfilled, state => {
      state.loadingSendOtp = 'fulfilled';
    });
    builder.addCase(handleSendOtp.rejected, state => {
      state.loadingSendOtp = 'rejected';
    });

    // verify otp
    builder.addCase(handleVerifyOtp.pending, state => {
      state.loadingVerifyOtp = 'pending';
    });
    builder.addCase(handleVerifyOtp.fulfilled, state => {
      state.loadingVerifyOtp = 'fulfilled';
    });
    builder.addCase(handleVerifyOtp.rejected, state => {
      state.loadingVerifyOtp = 'rejected';
    });
  },
});

export const {
  addAccessToken,
  removeAccessToken,
  resetLoadingAuth,
  resetLoadingSendOtp,
  resetLoadingVerifyOtp,
} = authSlice.actions;
export const authReducer = authSlice.reducer;
