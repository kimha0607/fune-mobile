import { createSlice } from '@reduxjs/toolkit';
import { UserSlice } from './types';
import {
  getUserInfo,
  handleChangePassword,
  handleChangeUserInfo,
} from './thunk';

export const initialState: UserSlice = {
  user: undefined,
  loadingGetUserInfo: 'idle',
  loadingChangeUserPassword: 'idle',
  loadingChangeUserInfo: 'idle',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetLoadingUserInfo: state => {
      state.loadingGetUserInfo = 'idle';
    },
    resetLoadingChangeUserPassword: state => {
      state.loadingChangeUserPassword = 'idle';
    },
    resetLoadingChangeUserInfo: state => {
      state.loadingChangeUserInfo = 'idle';
    },
  },
  extraReducers: builder => {
    // get user
    builder.addCase(getUserInfo.pending, state => {
      state.loadingGetUserInfo = 'pending';
    });
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loadingGetUserInfo = 'fulfilled';
    });
    builder.addCase(getUserInfo.rejected, state => {
      state.loadingGetUserInfo = 'rejected';
    });

    // change password user
    builder.addCase(handleChangePassword.pending, state => {
      state.loadingChangeUserPassword = 'pending';
    });
    builder.addCase(handleChangePassword.fulfilled, state => {
      state.loadingChangeUserPassword = 'fulfilled';
    });
    builder.addCase(handleChangePassword.rejected, state => {
      state.loadingChangeUserPassword = 'rejected';
    });

    // change user info
    builder.addCase(handleChangeUserInfo.pending, state => {
      state.loadingChangeUserInfo = 'pending';
    });
    builder.addCase(handleChangeUserInfo.fulfilled, state => {
      state.loadingChangeUserInfo = 'fulfilled';
    });
    builder.addCase(handleChangeUserInfo.rejected, state => {
      state.loadingChangeUserInfo = 'rejected';
    });
  },
});

export const {
  resetLoadingUserInfo,
  resetLoadingChangeUserPassword,
  resetLoadingChangeUserInfo,
} = userSlice.actions;
export const userReducer = userSlice.reducer;
