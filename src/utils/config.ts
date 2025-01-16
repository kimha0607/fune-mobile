export const STORAGE_KEY = {
  ACCESS_TOKEN: 'accessToken',
  ONBOARDING: 'onBoarding',
};

export const segmentOptions = [
  {
    id: 1,
    name: 'Tra cứu',
  },
  {
    id: 2,
    name: 'Dịch vụ',
  },
];

export const CODE400 = [
  {
    code: 'E001',
    message: 'đã tồn tại',
  },
  {
    code: 'E002',
    message: 'sai mật khẩu',
  },
  {
    code: 'E003',
    message: 'không thể được đặt trong quá khứ.',
  },
  {
    code: 'E005',
    message: 'bác sĩ này đã có người đặt vào thời gian này.',
  },
  {
    code: 'E999',
    message: 'không được để trống.',
  },
];

export const FIELD_TRANSLATIONS = [
  {
    fieldName: 'email',
    translation: 'Email',
  },
  {
    fieldName: 'password',
    translation: 'Mật khẩu',
  },
  {
    fieldName: 'phone',
    translation: 'Số điện thoại',
  },
  {
    fieldName: 'appointment_time',
    translation: 'Lịch',
  },
  {
    fieldName: 'user',
    translation: 'Người dùng',
  },
  {
    fieldName: 'dental_issue',
    translation: 'Dịch vụ',
  },
  {
    fieldName: 'doctor_id',
    translation: 'Bác sĩ',
  },
];

export const DENTAL_ISSUE = [
  {
    code: 'caries',
    name: 'Sâu răng',
  },
  {
    code: 'wisdom_tooth',
    name: 'Khám răng khôn',
  },
  {
    code: 'tartar',
    name: 'Lấy cao răng',
  },
  {
    code: 'teeth_whitening',
    name: 'Tẩy trắng răng',
  },
  {
    code: 'orthodontics',
    name: 'Niềng răng',
  },
  {
    code: 'extraction',
    name: 'Nhổ răng',
  },
  {
    code: 'checkup',
    name: 'Khám tổng quát',
  },
];
