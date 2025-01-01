import { createSlice } from '@reduxjs/toolkit';
import { AuthSlice } from './types';
import { handleLogin, handleRegister } from './thunk';

export const initialState: AuthSlice = {
  accessToken: '',
  loadingSignIn: 'idle',
  loadingRegister: 'idle',
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
  },
});

export const { addAccessToken, removeAccessToken, resetLoadingAuth } =
  authSlice.actions;
export const authReducer = authSlice.reducer;
