import { createAsyncThunk } from '@reduxjs/toolkit';
import { register, sendOtp, signIn, verifyOtp } from '../../../axios/auth/api';
import {
  PayloadLogin,
  PayloadRegister,
  PayloadSendOtp,
  PayloadVerifyOtp,
} from '../../../types/auth';
import { IBaseError } from '../../../types/error';
import { transformErrorList } from '../../../utils/helper';

export const handleLogin = createAsyncThunk(
  'auth/login',
  async (user: PayloadLogin) => {
    const response = await signIn(user);
    if (!response || !response.data) {
      throw new Error('Network Error!');
    }
    return response.data;
  },
);

export const handleRegister = createAsyncThunk(
  'auth/register',
  async (user: PayloadRegister) => {
    const response = await register(user);
    if (!response) {
      throw new Error('Network Error!');
    }
    return response.data;
  },
);

export const handleSendOtp = createAsyncThunk<
  any,
  PayloadSendOtp,
  { rejectValue: IBaseError[] }
>('auth/send-otp', async (payload, { rejectWithValue }) => {
  const response = await sendOtp(payload);
  if (!response || !response.data) {
    throw new Error('Network Error!');
  }
  if (response?.data?.code === '400') {
    const err: IBaseError[] = transformErrorList([response?.data?.data]);

    return rejectWithValue(err);
  }
  return response.data.data;
});

export const handleVerifyOtp = createAsyncThunk<
  any,
  PayloadVerifyOtp,
  { rejectValue: IBaseError[] }
>('auth/verify-otp', async (payload: PayloadVerifyOtp, { rejectWithValue }) => {
  const response = await verifyOtp(payload);
  if (!response || !response.data) {
    throw new Error('Network Error!');
  }
  if (response?.data?.code === '400') {
    const err: IBaseError[] = transformErrorList([response?.data?.data]);
    return rejectWithValue(err);
  }
  return response;
});
