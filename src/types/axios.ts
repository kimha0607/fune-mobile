export type IBodyResponse<T = any> = IAxiosResponse<T> | undefined;

export interface IAxiosResponse<T = any> {
  status: number;
  statusText: string;
  data: {
    status: string;
    code: number;
    message: string;
    data: T;
  };
}

export interface IBodyResponseError<T = any> {
  status: number;
  statusText: string;
  data: {
    status: 'error';
    code: number;
    message: string;
    errors: T;
  };
}
