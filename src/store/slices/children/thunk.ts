import { createAsyncThunk } from '@reduxjs/toolkit';
import { addChildren, fetchChildrenList } from '../../../axios/children/api';
import { PayloadChildren } from '../../../types/children';

export const getChildrenList = createAsyncThunk(
  'children/getChildrenList',
  async (id: number) => {
    const res = await fetchChildrenList(id);
    if (!res || !res.data) {
      throw new Error('Network Error!');
    }
    return res.data.data;
  },
);

export const handleAddChild = createAsyncThunk(
  'children/addChildren',
  async (payload: PayloadChildren) => {
    const response = await addChildren(payload);
    if (!response || !response.data || response.data.status === 'error') {
      throw new Error('Network Error!');
    }
    return response.data;
  },
);
