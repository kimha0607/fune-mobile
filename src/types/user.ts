export interface IBaseUserInfo {
  id: string;
  email: string;
  name: string;
  phone: string;
  address: string;
  role_id: number;
  active: boolean;
  updated_at: string;
  created_at: string;
}

export interface PasswordChangePayload {
  currentPassword: string;
  newPassword: string;
}

export interface ProfileChangePayload {
  phoneNumber: string;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  description: string;
}
