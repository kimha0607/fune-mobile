import { createSlice } from '@reduxjs/toolkit';
import { AppointmentSlice } from './types';
import { getAppointmentList } from './thunk';

export const initialState: AppointmentSlice = {
  appointmentList: [],
  loadingGetAppointmentList: 'idle',
};

const appointmentSlice = createSlice({
  name: 'appointment',
  initialState,
  reducers: {
    resetLoadingGetAppointmentList: state => {
      state.loadingGetAppointmentList = 'idle';
    },
  },
  extraReducers: builder => {
    // get appointment list
    builder.addCase(getAppointmentList.pending, state => {
      state.loadingGetAppointmentList = 'pending';
    });
    builder.addCase(getAppointmentList.fulfilled, (state, action) => {
      state.appointmentList = action.payload;
      state.loadingGetAppointmentList = 'fulfilled';
    });
    builder.addCase(getAppointmentList.rejected, state => {
      state.loadingGetAppointmentList = 'rejected';
    });
  },
});

export const { resetLoadingGetAppointmentList } = appointmentSlice.actions;
export const appointmentReducer = appointmentSlice.reducer;
