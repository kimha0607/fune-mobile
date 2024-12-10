import { RootState } from '../../store';

export const selectAccessToken = (state: RootState) =>
  state.authReducer.accessToken;

export const selectLoadingSignIn = (state: RootState) =>
  state.authReducer.loadingSignIn;

export const selectLoadingRegister = (state: RootState) =>
  state.authReducer.loadingRegister;

export const selectLoadingSendOtp = (state: RootState) =>
  state.authReducer.loadingSendOtp;

export const selectLoadingVerifyOtp = (state: RootState) =>
  state.authReducer.loadingVerifyOtp;
