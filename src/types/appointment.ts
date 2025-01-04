import { IBaseChildren } from './children';
import { IBaseClinic } from './clinic';
import { IBaseUserInfo } from './user';

export interface IBaseAppointment {
  id: number;
  patient_id: number;
  doctor_id: number;
  dental_issue: string;
  clinic_id: number;
  appointment_time: string;
  status: string;
  created_at: string;
  updated_at: string;
  patient: IBaseUserInfo & {
    children: IBaseChildren[];
  };
  doctor: IBaseUserInfo;
  clinic: IBaseClinic;
}

export interface IBaseAppointmentList {
  current_page: number;
  data: IBaseAppointment[];
  total: number;
}

export interface PayloadAppointmentBooking {
  clinic_id: number;
  doctor_id: number;
  patient_id: number;
  appointment_time: string;
  dental_issue: string;
}

export interface ResponseAppointmentBooking {
  message: string;
  appointment: IBaseAppointment;
}
