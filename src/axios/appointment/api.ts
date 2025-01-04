import { IBaseAppointmentList } from '../../types/appointment';
import { IBodyResponse } from '../../types/axios';
import axiosInstance from '../axios';

const APPOINTMENT_API_ENDPOINT = '/api/appointments';

export async function fetchAppointment(
  id: number,
): Promise<IBodyResponse<IBaseAppointmentList>> {
  const res = await axiosInstance.get(
    `${APPOINTMENT_API_ENDPOINT}?patient_name=${id}`,
  );
  return res;
}
