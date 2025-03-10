import { RootState } from '../../store';

export const selectAppointmentList = (state: RootState) =>
  state.appointmentReducer.appointmentList;

export const selectLoadingGetAppointmentList = (state: RootState) =>
  state.appointmentReducer.loadingGetAppointmentList;

export const selectLoadingAppointmentBooking = (state: RootState) =>
  state.appointmentReducer.loadingAppointmentBooking;
