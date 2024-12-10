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
    message: 'Vui long nhập đầy đủ thông tin',
  },
  {
    code: 'E002',
    message: 'Sai mật khẩu',
  },
  {
    code: 'E003',
    message: 'Tài khoản đã bị khoá',
  },
  {
    code: 'E004',
    message: 'đã tồn tại',
  },
  {
    code: 'E005',
    message: 'Đã ở chế độ ẩn.',
  },
  {
    code: 'E006',
    message: 'sai định dạng',
  },
  {
    code: 'E007',
    message: 'Mã OTP không hợp lệ',
  },
  {
    code: 'E008',
    message: 'Mã otp hết hạn sử dụng',
  },
  {
    code: 'E009',
    message: 'Hết phiên đăng nhập',
  },
  {
    code: 'E010',
    message: 'Mật khẩu mới phải khác mật khẩu cũ',
  },
  {
    code: 'E011',
    message: 'Email này chưa được xác minh',
  },
];

export const FIELD_TRANSLATIONS = [
  {
    fieldName: 'username or email',
    translation: 'Email',
  },
  {
    fieldName: 'email',
    translation: 'Email',
  },
  {
    fieldName: 'password',
    translation: 'Mật khẩu',
  },
  {
    fieldName: 'phoneNumber',
    translation: 'Số điện thoại',
  },
  {
    fieldName: '^((03|05|07|08|09)+([0-9]{8}))$',
    translation: 'Số điện thoại',
  },
];
