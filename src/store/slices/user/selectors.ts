import { RootState } from '../../store';

export const selectUserInfo = (state: RootState) => state.userReducer.user;

export const selectLoadingGetUserInfo = (state: RootState) =>
  state.userReducer.loadingGetUserInfo;

export const selectLoadingChangeUserPassword = (state: RootState) =>
  state.userReducer.loadingChangeUserPassword;

export const selectLoadingChangeUserInfo = (state: RootState) =>
  state.userReducer.loadingChangeUserInfo;
