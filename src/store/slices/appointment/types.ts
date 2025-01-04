import { IBaseAppointment } from '../../../types/appointment';
import { Loading } from '../../../types/loading';

export interface AppointmentSlice {
  appointmentList: IBaseAppointment[];
  loadingGetAppointmentList: Loading;
}
