import { IBaseError } from './../../types/error';
import { IBodyResponse } from '../../types/axios';
import {
  IBaseUserInfo,
  PasswordChangePayload,
  ProfileChangePayload,
} from '../../types/user';
import axiosInstance from '../axios';

const USER_API_ENDPOINT = '/api/pharma/v1/user';

export async function fetchUserInfo(): Promise<IBodyResponse<IBaseUserInfo>> {
  return await axiosInstance.get(`${USER_API_ENDPOINT}/info`);
}

export async function changeUserPassword(
  payload: PasswordChangePayload,
): Promise<IBodyResponse<IBaseUserInfo | IBaseError[]>> {
  return await axiosInstance.post(
    `${USER_API_ENDPOINT}/change-password`,
    payload,
  );
}

export async function changeUserInfo(
  payload: ProfileChangePayload,
): Promise<IBodyResponse<'OK' | IBaseError>> {
  return await axiosInstance.post(
    `${USER_API_ENDPOINT}/change-info-user`,
    payload,
  );
}
