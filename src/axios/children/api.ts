import { IBodyResponse } from '../../types/axios';
import { IBaseChildren, PayloadChildren } from '../../types/children';
import axiosInstance from '../axios';

const CHILDREN_API_ENDPOINT = '/api/children';

export async function fetchChildrenList(
  id: number,
): Promise<IBodyResponse<IBaseChildren[]>> {
  return await axiosInstance.get(`${CHILDREN_API_ENDPOINT}/${id}`);
}

export async function addChildren(
  payload: PayloadChildren,
): Promise<IBodyResponse<IBaseChildren>> {
  return await axiosInstance.post(`${CHILDREN_API_ENDPOINT}`, payload);
}
