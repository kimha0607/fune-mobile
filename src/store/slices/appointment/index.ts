import { createSlice } from '@reduxjs/toolkit';
import { AppointmentSlice } from './types';
import { getAppointmentList, handleAppointmentBooking } from './thunk';

export const initialState: AppointmentSlice = {
  appointmentList: [],
  loadingGetAppointmentList: 'idle',
  loadingAppointmentBooking: 'idle',
};

const appointmentSlice = createSlice({
  name: 'appointment',
  initialState,
  reducers: {
    resetLoadingGetAppointmentList: state => {
      state.loadingGetAppointmentList = 'idle';
    },
    resetLoadingAppointmentBooking: state => {
      state.loadingAppointmentBooking = 'idle';
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

    // appointment booking
    builder.addCase(handleAppointmentBooking.pending, state => {
      state.loadingAppointmentBooking = 'pending';
    });
    builder.addCase(handleAppointmentBooking.fulfilled, (state, action) => {
      state.appointmentList = action.payload;
      state.loadingAppointmentBooking = 'fulfilled';
    });
    builder.addCase(handleAppointmentBooking.rejected, state => {
      state.loadingAppointmentBooking = 'rejected';
    });
  },
});

export const {
  resetLoadingGetAppointmentList,
  resetLoadingAppointmentBooking,
} = appointmentSlice.actions;
export const appointmentReducer = appointmentSlice.reducer;
