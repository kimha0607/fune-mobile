import { Loading } from '../../../types/loading';

export interface AuthSlice {
  accessToken: string;
  loadingSignIn: Loading;
  loadingRegister: Loading;
  loadingSendOtp: Loading;
  loadingVerifyOtp: Loading;
}
