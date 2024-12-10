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
import { IBaseError } from '../../../types/error';
import { transformErrorList } from '../../../utils/helper';

export const getUserInfo = createAsyncThunk('user/getUserInfo', async () => {
  const res = await fetchUserInfo();
  if (!res || !res.data) {
    throw new Error('Network Error!');
  }
  return res.data.data;
});

export const handleChangePassword = createAsyncThunk<
  any,
  PasswordChangePayload,
  { rejectValue: IBaseError[] }
>(
  'user/changePassword',
  async (payload: PasswordChangePayload, { rejectWithValue }) => {
    const response = await changeUserPassword(payload);
    if (!response) {
      throw new Error('Network Error!');
    }
    if (response?.data?.code === '400') {
      const dataError = response?.data?.data;
      if (Array.isArray(dataError)) {
        return rejectWithValue(transformErrorList(dataError));
      }
    }
    return response.data;
  },
);

export const handleChangeUserInfo = createAsyncThunk<
  any,
  ProfileChangePayload,
  { rejectValue: IBaseError[] }
>(
  'user/changeProfile',
  async (payload: ProfileChangePayload, { rejectWithValue }) => {
    const response = await changeUserInfo(payload);
    if (!response || !response.data || !response.data) {
      throw new Error('Network Error!');
    }
    if (response?.data?.code === '400') {
      const dataError = response?.data?.data;
      if (Array.isArray(dataError)) {
        return rejectWithValue(transformErrorList(dataError));
      }
    }
    return response.data;
  },
);
