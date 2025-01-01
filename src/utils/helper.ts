import { Alert, Linking, Platform } from 'react-native';
import { IBaseError } from '../types/error';
import { CODE400, FIELD_TRANSLATIONS } from './config';

export const transformErrorList = (errors: any[]) => {
  const result: any[] = [];
  errors.forEach((error: any) => {
    if (error.values) {
      Object.values(error.values).forEach(value => {
        result.push({
          code: error.code,
          values: value,
        });
      });
    } else {
      // Handle case where values is null or undefined
      result.push({
        code: error.code,
        values: null,
      });
    }
  });
  return result;
};

export const handleOpenZalo = async (phoneNumber: String) => {
  const zaloUrl = `https://zalo.me/${phoneNumber}`;

  try {
    const supported = await Linking.canOpenURL(zaloUrl);
    if (supported) {
      await Linking.openURL(zaloUrl);
    } else {
      const appStoreUrl =
        Platform.OS === 'ios'
          ? 'https://apps.apple.com/vn/app/zalo/id579523206'
          : 'https://play.google.com/store/apps/details?id=com.zing.zalo';
      await Linking.openURL(appStoreUrl);
    }
  } catch (error) {
    console.error('An error occurred', error);
    Alert.alert('Lỗi', 'Không thể mở Zalo hoặc cửa hàng ứng dụng.');
  }
};

export const formatCurrencyVND = (amount: number) => {
  const formattedAmount = amount.toLocaleString('vi-VN');
  return `${formattedAmount} đ`;
};

export const calculateRemainingDays = (isoDate: string): number => {
  const pastDate = new Date(isoDate);

  const currentDate = new Date();

  const timeDiff = pastDate.getTime() - currentDate.getTime();
  const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  return daysDiff;
};

export const splitFullName = (fullName: string) => {
  let firstName = '';
  let lastName = '';

  if (fullName) {
    const nameParts = fullName.trim().split(' ');
    if (nameParts.length > 1) {
      firstName = nameParts.slice(1).join(' ');
      lastName = nameParts[0];
    } else {
      lastName = nameParts[0];
    }
  }

  return { firstName, lastName };
};

export const truncateString = (value: string, maxLength: number) => {
  if (value.length > maxLength) {
    return value.slice(0, maxLength - 3) + '...';
  }
  return value;
};

export const getErrorMessages = (err: IBaseError[]) => {
  return err.map(e => {
    // Tìm đối tượng trong CODE400 có code khớp với err.code
    const codeInfo = CODE400.find(item => item.code === e.code);

    // Tìm bản dịch của field từ FIELD_TRANSLATIONS
    const fieldTranslation = FIELD_TRANSLATIONS.find(
      item => item.fieldName === e.field,
    );

    // Nếu tìm thấy bản dịch cho field, thay thế field bằng bản dịch
    const translatedField = fieldTranslation
      ? fieldTranslation.translation
      : e.field;

    // Nếu tìm thấy code trong CODE400, tạo message bằng cách kết hợp field (đã dịch) và message
    if (codeInfo) {
      return { message: `${translatedField} ${codeInfo.message}` };
    }

    // Nếu không tìm thấy code trong CODE400, trả về message mặc định
    return { message: 'Lỗi không xác định' };
  });
};
