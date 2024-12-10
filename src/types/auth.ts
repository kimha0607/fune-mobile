import { IBaseUserInfo } from './user.ts';

export interface IBaseResLogin {
  accessToken: string;
  expiredIn?: string;
  expiredTime?: string;
  lock?: string;
  refreshToken?: string;
  userInfo: IBaseUserInfo;
}

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

export interface PayloadSendOtp {
  email: string;
  type: number;
}

export type AuthActionType = 'confirm-email' | 'forgot-password';

export interface PayloadVerifyOtp {
  email: string;
  otp: string;
  type: number;
}

export interface ResponseLogin {
  token: string;
}
