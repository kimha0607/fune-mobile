import { IBaseClinic } from './clinic';
import { IBaseUserInfo } from './user';

export interface IBaseAppointment {
  id: number;
  patient_id: number;
  doctor_id: number;
  clinic_id: number;
  appointment_time: string;
  status: string;
  created_at: string;
  updated_at: string;
  patient: IBaseUserInfo;
  doctor: IBaseUserInfo;
  clinic: IBaseClinic;
}

export interface IBaseAppointmentList {
  current_page: number;
  data: IBaseAppointment[];
  total: number;
}
