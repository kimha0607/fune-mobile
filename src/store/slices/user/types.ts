import { Loading } from '../../../types/loading';
import { IBaseUserInfo } from '../../../types/user';

export interface UserSlice {
  user: IBaseUserInfo | undefined;
  loadingGetUserInfo: Loading;
  loadingChangeUserPassword: Loading;
  loadingChangeUserInfo: Loading;
}
