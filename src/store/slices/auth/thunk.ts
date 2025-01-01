import { createAsyncThunk } from '@reduxjs/toolkit';
import { register, signIn } from '../../../axios/auth/api';
import { PayloadLogin, PayloadRegister } from '../../../types/auth';

export const handleLogin = createAsyncThunk(
  'auth/login',
  async (user: PayloadLogin) => {
    const response = await signIn(user);
    if (
      !response ||
      !response.data ||
      !response.data.data ||
      response.data.status === 'error'
    ) {
      throw new Error('Network Error!');
    }

    return response.data.data;
  },
);

export const handleRegister = createAsyncThunk(
  'auth/register',
  async (user: PayloadRegister) => {
    const response = await register(user);
    if (!response || !response.data || response.data.status === 'error') {
      throw new Error('Network Error!');
    }
    return response.data;
  },
);
