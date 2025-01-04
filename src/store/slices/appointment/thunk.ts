import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  appointmentBooking,
  fetchAppointment,
} from '../../../axios/appointment/api';
import { PayloadAppointmentBooking } from '../../../types/appointment';

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

export const handleAppointmentBooking = createAsyncThunk(
  'appointment/appointmentBooking',
  async (payload: PayloadAppointmentBooking) => {
    const res = await appointmentBooking(payload);
    if (!res || !res.data) {
      throw new Error('Network Error!');
    }
    return res.data.data.data;
  },
);
