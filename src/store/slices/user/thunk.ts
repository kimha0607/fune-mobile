import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  changeUserInfo,
  changeUserPassword,
  fetchUserInfo,
} from '../../../axios/user/api';
import {
  PasswordChangePayload,
  ProfileChangePayload,
} from '../../../types/user';

export const getUserInfo = createAsyncThunk('user/getUserInfo', async () => {
  const res = await fetchUserInfo();
  if (!res || !res.data) {
    throw new Error('Network Error!');
  }
  return res.data.data;
});

export const handleChangePassword = createAsyncThunk(
  'user/changePassword',
  async (payload: PasswordChangePayload) => {
    const response = await changeUserPassword(payload);
    if (!response || !response.data || response.data.status === 'error') {
      throw new Error('Network Error!');
    }
    return response.data;
  },
);

export const handleChangeUserInfo = createAsyncThunk(
  'user/changeProfile',
  async ({ payload, id }: { payload: ProfileChangePayload; id: number }) => {
    const response = await changeUserInfo(payload, id);
    if (!response || !response.data || response.data.status === 'error') {
      throw new Error('Network Error!');
    }
    return response.data;
  },
);
