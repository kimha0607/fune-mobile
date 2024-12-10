import {
  PayloadLogin,
  PayloadRegister,
  PayloadVerifyOtp,
  PayloadSendOtp,
  ResponseLogin,
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
): Promise<IBodyResponse<any>> {
  const res = await axiosInstance.post('/api/register', payload);
  return res;
}

export async function sendOtp(
  payload: PayloadSendOtp,
): Promise<IBodyResponse<any>> {
  const response = await axiosInstance.post(
    '/api/pharma/pub/send-otp',
    payload,
  );
  return response;
}

export async function verifyOtp(
  payload: PayloadVerifyOtp,
): Promise<IBodyResponse<any>> {
  const response = await axiosInstance.post(
    '/api/pharma/pub/verify-otp',
    payload,
  );
  return response;
}
