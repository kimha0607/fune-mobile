import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAppointment } from '../../../axios/appointment/api';

export const getAppointmentList = createAsyncThunk(
  'appointment/getAppointmentList',
  async (id: number) => {
    const res = await fetchAppointment(id);
    if (!res || !res.data) {
      throw new Error('Network Error!');
    }
    return res.data.data.data;
  },
);
