export type IBodyResponse<T = any> = IAxiosResponse<T> | undefined;

export interface IAxiosResponse<T = any> {
  status: number;
  statusText: string;
  data?: T;
}

export interface IBodyResponseError<E = string> {
  message: string;
  type: E;
}

export interface IBodyResponseError400 {
  code: string;
  values: {
    [key: string]: string;
  };
}
