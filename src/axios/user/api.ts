import { IBodyResponse } from '../../types/axios';
import {
  IBaseUserInfo,
  IBaseUserList,
  PasswordChangePayload,
  ProfileChangePayload,
} from '../../types/user';
import axiosInstance from '../axios';

const USER_API_ENDPOINT = '/api/users';

export async function fetchUserInfo(): Promise<IBodyResponse<IBaseUserInfo>> {
  return await axiosInstance.get(`${USER_API_ENDPOINT}/info`);
}

export async function fetchDoctorInfo(): Promise<IBodyResponse<IBaseUserList>> {
  return await axiosInstance.get(`${USER_API_ENDPOINT}?role_id=2`);
}

export async function changeUserPassword(
  payload: PasswordChangePayload,
): Promise<IBodyResponse<[]>> {
  return await axiosInstance.patch(
    `${USER_API_ENDPOINT}/change-password`,
    payload,
  );
}

export async function changeUserInfo(
  payload: ProfileChangePayload,
  id: number,
): Promise<IBodyResponse<IBaseUserInfo>> {
  return await axiosInstance.put(`${USER_API_ENDPOINT}/${id}`, payload);
}
