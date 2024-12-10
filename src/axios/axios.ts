import axios from 'axios';
import { STORAGE_KEY } from '../utils/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import store from '../store/store';
import { removeAccessToken } from '../store/slices/auth';
import Toast from 'react-native-toast-message';
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || '',
});

axiosInstance.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${JSON.parse(token || '{}')}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    console.log('error', error);
    if (error.response && error.response.status === 403) {
      await AsyncStorage.removeItem(STORAGE_KEY.ACCESS_TOKEN);
      store.dispatch(removeAccessToken());
      Alert.alert('Hết phiên đăng nhập', 'Vui lòng đăng nhập lại ứng dụng');
      throw new Error(
        'Unauthorized: Access token might be expired or invalid.',
      );
    }
    if (error.response && error.response.status === 500) {
      Toast.show({
        type: 'error',
        text1: 'Thông báo',
        text2: 'Có lỗi xảy ra từ máy chủ.',
      });
      await AsyncStorage.removeItem(STORAGE_KEY.ACCESS_TOKEN);
      store.dispatch(removeAccessToken());
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
