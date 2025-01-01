export interface IBaseUserInfo {
  id: number;
  email: string;
  name: string;
  phone: string;
  address: string;
  role_id: number;
  active: number;
  updated_at: string;
  created_at: string;
}

export interface PasswordChangePayload {
  current_password: string;
  new_password: string;
}

export interface ProfileChangePayload {
  name: string;
  phone: string;
  address: string;
  role_id: number;
  active: number;
}
