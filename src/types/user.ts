export interface IBaseUserInfo {
  firstName?: string;
  lastName?: string;
  lockStartDate?: Date | null;
  phoneNumber?: string;
  recordId?: number | null;
  subscriptionEndDate?: string;
  username?: string;
  isBought?: boolean;
  address?: string;
  isActive?: boolean;
  packageId?: number;
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
