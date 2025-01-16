import {
  IBaseAppointmentList,
  PayloadAppointmentBooking,
} from '../../types/appointment';
import { IBodyResponse } from '../../types/axios';
import axiosInstance from '../axios';

const APPOINTMENT_API_ENDPOINT = '/api/appointments';

export async function fetchAppointment(
  id: number,
): Promise<IBodyResponse<IBaseAppointmentList>> {
  const res = await axiosInstance.get(
    `${APPOINTMENT_API_ENDPOINT}?patient_id=${id}`,
  );
  return res;
}

export async function appointmentBooking(
  payload: PayloadAppointmentBooking,
): Promise<IBodyResponse<IBaseAppointmentList>> {
  const res = await axiosInstance.post(`${APPOINTMENT_API_ENDPOINT}`, payload);
  return res;
}
