import { IBaseUserInfo } from './user.ts';

export interface PayloadLogin {
  email: string;
  password: string;
}

export interface PayloadRegister {
  email: string;
  name: string;
  phone: string;
  address: string;
  password: string;
}

export interface ResponseLogin {
  token: string;
}

export interface ResponseRegister {
  user: IBaseUserInfo;
}
