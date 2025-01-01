import {
  PayloadLogin,
  PayloadRegister,
  ResponseLogin,
  ResponseRegister,
} from '../../types/auth';
import { IBodyResponse } from '../../types/axios';
import axiosInstance from '../axios';

export async function signIn(
  payload: PayloadLogin,
): Promise<IBodyResponse<ResponseLogin>> {
  const res = await axiosInstance.post('/api/login', payload);
  return res;
}

export async function register(
  payload: PayloadRegister,
): Promise<IBodyResponse<ResponseRegister>> {
  const res = await axiosInstance.post('/api/register', payload);
  return res;
}
